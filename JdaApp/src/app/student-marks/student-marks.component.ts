import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { StudentService } from '../shared/student.service';
import { Student } from '../student/student.model';
import { SelectionModel } from '@angular/cdk/collections';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';
import { Router } from '@angular/router';
import { Class } from '../class-detail/class.model';
import { ClassDetailService } from '../shared/class-detail.service';
import { StudentMarksService } from '../shared/student-marks.service';
import { StudentMarks, StudentmarksParams } from './StudentMarks.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentMarksDialogComponent } from './student-marks-dialog/student-marks-dialog.component';

declare var $: any;



@Component({
  selector: 'app-student-marks',
  templateUrl: './student-marks.component.html',
  styleUrls: ['./student-marks.component.scss']
})
export class StudentMarksComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  studentmarksParams: StudentmarksParams = {
    ClassId: null,
    StudentId: null
  }
  isLoadingResults = true;
  columnsToDisplay: string[] =
    [

      'Id',
      'Subject',
      'ExamType',
      'TotalMarks',
      'MarksObtained',
      'ResultStatus',
      'Grade'
    ];

  systemDate = new Date();

  dataSource: MatTableDataSource<StudentMarks>;

  selection: SelectionModel<StudentMarks>;

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

  students: Student[];

  studentMarks :StudentMarks;

  constructor(private studentService: StudentService
    , private exportAsService: ExportAsService
    , private router: Router
    , private classService: ClassDetailService
    , private studentMarksService: StudentMarksService
    ,public dialog: MatDialog
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(StudentMarksDialogComponent, {
      width: '1000px',
      data: { studentMarks :this.studentMarks }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.studentMarks = result;
    });
  }
  ngOnInit() {
    this.GetClasses();
    this.isLoadingResults = false;
    this.selection = new SelectionModel<StudentMarks>(true, []);
  }
  private GetClasses() {
    this.classService.getClasses().subscribe((data: any) => {
      this.classDetails = data;
    }, (error: any) => { });
  }

  viewStudents(classId: number) {
    this.classId = classId;
    this.GetStudentsByClass(classId);
  }


  public StudentMarksSearch() {
    this.studentMarksService.GetStudentmarks(this.studentmarksParams).subscribe((x) => {
      this.dataSource = new MatTableDataSource<StudentMarks>(x);
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
      this.dataSource.sort = this.sort;
    }, () => { }, () => { this.isLoadingResults = false });

    this.selection = new SelectionModel<StudentMarks>(true, []);
  }
  private GetStudentsByClass(classId: number) {

    this.studentService.GetStudentsByClass(classId).subscribe((x) => {
      this.students = x;
    }, () => { }, () => { });


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
    var record = new StudentMarks
    this.studentMarksService
      .AddStudentMarks(record)
      .subscribe((data: any) =>
        () => { },
        (error: any) => { console.log(error) }
      );
  }
}

