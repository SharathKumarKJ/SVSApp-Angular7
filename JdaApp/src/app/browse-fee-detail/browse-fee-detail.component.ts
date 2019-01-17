import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Fee } from '../fee-detail/fee.model';
import { FeeService } from '../shared/fee.service';

@Component({
  selector: 'app-browse-fee-detail',
  templateUrl: './browse-fee-detail.component.html',
  styleUrls: ['./browse-fee-detail.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class BrowseFeeDetailComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoadingResults = true;

  columnsToDisplay: string[] =
  [
    'select',
    'Id',
    'StudentName',
    'DueDate',
    'PaidDate',
    'TotalAmount',
    'PaidAmount',
    'BalanceAmount',
    'FeeStatus',
    'IsActive'];

    dataSource: MatTableDataSource<Fee>;

    selection: SelectionModel<Fee>;

    constructor(private feeService: FeeService) { }

  ngOnInit() {

    this.feeService.GetFees().subscribe((x) => {
      this.dataSource = new MatTableDataSource<Fee>(x);
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
      this.dataSource.sort = this.sort;
    });

    this.selection = new SelectionModel<Fee>(true, []);
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
}
