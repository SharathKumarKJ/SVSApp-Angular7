import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { BrowseTeacherSubjectDetailDataSource } from './browse-teacher-subject-detail-datasource';

@Component({
  selector: 'app-browse-teacher-subject-detail',
  templateUrl: './browse-teacher-subject-detail.component.html',
  styleUrls: ['./browse-teacher-subject-detail.component.scss'],
})
export class BrowseTeacherSubjectDetailComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: BrowseTeacherSubjectDetailDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new BrowseTeacherSubjectDetailDataSource(this.paginator, this.sort);
  }
}
