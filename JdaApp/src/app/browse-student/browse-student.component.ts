import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { StudentService } from '../shared/student.service';
import { Student } from '../student/student.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-browse-student',
  templateUrl: './browse-student.component.html',
  styleUrls: ['./browse-student.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class BrowseStudentComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoadingResults = true;
  columnsToDisplay: string[] =
    [
      'Id',
      'Name',
      'FatherName',
      'MotherName',
      'STSCode',
      'DateofBirth',
      'City',
      'State',
      'PostalCode',
      'Gender',
      'Nationality'];

  dataSource: MatTableDataSource<Student>;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.GetStudents().subscribe((x) => {
      this.dataSource = new MatTableDataSource<Student>(x);
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
      this.dataSource.sort = this.sort;
    });

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
