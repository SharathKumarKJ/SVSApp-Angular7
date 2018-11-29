
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TeacherSubjectDetailService } from '../shared/teacher-subject-detail.service';
import { TeacherSubject } from '../teacher-subject-detail/teacher-subject.model';

@Component({
  selector: 'app-browse-teacher-subject-detail',
  templateUrl: './browse-teacher-subject-detail.component.html',
  styleUrls: ['./browse-teacher-subject-detail.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BrowseTeacherSubjectDetailComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoadingResults = true;
  columnsToDisplay: string[] =
    [
      'Id',
      'Teacher',
      'Subject',
      'ClassDetail'];

  dataSource: MatTableDataSource<TeacherSubject>;

  constructor(private teacherSubjectDetailService: TeacherSubjectDetailService) { }

  ngOnInit() {
    this.teacherSubjectDetailService.GetTeacherSubject().subscribe((x) => {
      this.dataSource = new MatTableDataSource<TeacherSubject>(x);
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

