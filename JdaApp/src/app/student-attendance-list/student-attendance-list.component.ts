import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';
import { Router } from '@angular/router';
import { Attendance } from '../student-attendance/attendance.model';
import { StudentAttendanceService } from '../shared/student-attendance.service';
import { ClassDetailService } from '../shared/class-detail.service';
import { AttendanceParam } from './student-AttendanceParam.model';

@Component({
  selector: 'app-student-attendance-list',
  templateUrl: './student-attendance-list.component.html',
  styleUrls: ['./student-attendance-list.component.scss']
})
export class StudentAttendanceListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoadingResults = true;
  columnsToDisplay: string[] =
    [
      // 'select',
      'Id',
      'Name',
      'AttendanceDate',
      'IsPresent',
    ];

  dataSource: MatTableDataSource<Attendance>;
  selection: SelectionModel<Attendance>;

  exportAsConfig: ExportAsConfig = {
    type: 'pdf',
    elementId: 'AttendanceTable',
    options: { // html-docx-js document options
      orientation: 'landscape',
      margins: {
        top: '20'
      }
    }
  };

  classDetails: any;

  attendanceParam: AttendanceParam = {
    ClassName: null,
    Name: null,
    AttendanceDate: null,

  }

  constructor(private studentAttendanceService: StudentAttendanceService
    , private exportAsService: ExportAsService
    , private router: Router
    , private classService: ClassDetailService
  ) { }

  ngOnInit() {
    this.GetClasses();
    this.isLoadingResults = false;
    this.selection = new SelectionModel<Attendance>(true, []);

  }

  private attendanceSearch() {

    this.GetAttendanceByParam();
  }

  private GetAttendance() {
    this.isLoadingResults = true;
    this.studentAttendanceService.GetAttendances().subscribe((x) => {
      this.dataSource = new MatTableDataSource<Attendance>(x);
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
      this.dataSource.sort = this.sort;
    });
  }

  private GetAttendanceByParam() {
    console.log(this.attendanceParam.AttendanceDate);
    this.attendanceParam.AttendanceDate = this.attendanceParam.AttendanceDate != null
      ? this.attendanceParam.AttendanceDate.toDateString()
      : this.attendanceParam.AttendanceDate;

    this.studentAttendanceService.GetAttendanceByParam(this.attendanceParam).subscribe((x) => {
      this.dataSource = new MatTableDataSource<Attendance>(x);
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
      this.dataSource.sort = this.sort;
    });


    this.attendanceParam.ClassName=null;
    this.attendanceParam.AttendanceDate=null;
    this.attendanceParam.Name=null;
  }


  private GetClasses() {
    this.classService.getClasses().subscribe((data: any) => {
      this.classDetails = data;
    }, (error: any) => { });
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

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
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
}

