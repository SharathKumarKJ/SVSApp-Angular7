import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { BrowseUserDataSource } from './browse-user-datasource';

@Component({
  selector: 'app-browse-user',
  templateUrl: './browse-user.component.html',
  styleUrls: ['./browse-user.component.scss'],
})
export class BrowseUserComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: BrowseUserDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new BrowseUserDataSource(this.paginator, this.sort);
  }
}
