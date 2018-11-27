import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Teacher } from '../teacher/teacher.model';
import { TeacherService } from '../shared/teacher.service';


@Component({
  selector: 'app-browse-teacher',
  templateUrl: './browse-teacher.component.html',
  styleUrls: ['./browse-teacher.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class BrowseTeacherComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

 isLoadingResults = true;
  columnsToDisplay: string[] =
    [
      'Id',
      'Name',
      'AadharNumber',
      'PANNumber',
      'Qulification',
      'SpecialistIn',
      'Experience',
      'SubjectsHandle',
      'PostalCode',
      'DateofBirth',
      'Nationality',
      'City',
      'State',
      'PostalCode',
    ];

  dataSource: MatTableDataSource<Teacher>;

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.teacherService.GetTeachers().subscribe((x) => {
      this.dataSource = new MatTableDataSource<Teacher>(x);
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

