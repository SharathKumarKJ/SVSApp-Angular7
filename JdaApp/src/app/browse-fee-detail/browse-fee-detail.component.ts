import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { BrowseFeeDetailDataSource } from './browse-fee-detail-datasource';

@Component({
  selector: 'app-browse-fee-detail',
  templateUrl: './browse-fee-detail.component.html',
  styleUrls: ['./browse-fee-detail.component.scss'],
})
export class BrowseFeeDetailComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: BrowseFeeDetailDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new BrowseFeeDetailDataSource(this.paginator, this.sort);
  }
}
