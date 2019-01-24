import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { StudentService } from '../shared/student.service';
import { Student } from '../student/student.model';
import { SelectionModel } from '@angular/cdk/collections';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';
import { Router } from '@angular/router';
import { Class } from '../class-detail/class.model';
import { ClassDetailService } from '../shared/class-detail.service';
import { StudentAttendanceService } from '../shared/student-attendance.service';
declare var $: any;

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss']
})
export class StudentAttendanceComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoadingResults = true;
  columnsToDisplay: string[] =
    [

      'Id',
      'Name',
      'select',
    ];

  systemDate = new Date();

  dataSource: MatTableDataSource<Student>;

  selection: SelectionModel<Student>;

  exportAsConfig: ExportAsConfig = {
    type: 'pdf',
    elementId: 'studentTable',
    options: { // html-docx-js document options
      orientation: 'landscape',
      margins: {
        top: '20'
      }
    }
  }
  classId: number;
  classDetails: Class[];

  constructor(private studentService: StudentService
    , private exportAsService: ExportAsService
    , private router: Router
    , private classService: ClassDetailService
    , private studentAttendanceService: StudentAttendanceService
  ) { }

  ngOnInit() {
    this.GetClasses();
    this.isLoadingResults = false;
    this.selection = new SelectionModel<Student>(true, []);
  }
  private GetClasses() {
    this.classService.getClasses().subscribe((data: any) => {
      this.classDetails = data;
    }, (error: any) => { });
  }
  viewStudents(classId: number) {
    this.classId = classId;
    this.isLoadingResults = true;
    this.GetStudentsByClass(classId);
  }

  private GetStudentsByClass(classId: number) {
    this.studentService.GetStudentsByClass(classId).subscribe((x) => {
      this.dataSource = new MatTableDataSource<Student>(x);
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
      this.dataSource.sort = this.sort;
    }, () => { }, () => { this.isLoadingResults = false });

    this.selection = new SelectionModel<Student>(true, []);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  exportAs(type: SupportedExtensions) {
    this.exportAsConfig.type = type;
    this.exportAsService.save(this.exportAsConfig, 'Students');
    // this.exportAsService.get(this.config).subscribe(content => {
    //   console.log(content);
    // });
  }
  refresh(): void {
    window.location.reload();
  }

  onClick(studentId: number) {
    this.router.navigate(
      ['/student', studentId]
      , { queryParams: { 'searchTerm': 'searchTerm', 'testParam': 'testvalue' } }
    );
  }

  OnSubmit() {
    var Ids = "";
    this.selection.selected.map((x) => {
      Ids += x.Id + ",";
    });
    console.log(Ids);
    this.AddStudentAttendance(this.classId, Ids);
  }

  AddStudentAttendance(classId: number, studentIds: string) {
    this.studentAttendanceService
      .AddStudentAttendance(classId, studentIds)
      .subscribe((data: any) =>
        () => { },
        (error: any) => { console.log(error) }
      );
  }
}
