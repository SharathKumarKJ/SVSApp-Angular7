import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subject } from '../subject/subject.model';
import { SubjectService } from '../shared/subject.service';
import { ClassDetailService } from '../shared/class-detail.service';
import { Class } from '../class-detail/class.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-browse-classes',
  templateUrl: './browse-classes.component.html',
  styleUrls: ['./browse-classes.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BrowseClassesComponent implements OnInit {
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoadingResults = true;
  columnsToDisplay: string[] =
    [
      'select',
      'Id',
      'ClassName',
    ];

  dataSource: MatTableDataSource<Class>;
  selection: SelectionModel<Class>;

  constructor(private classDetailService: ClassDetailService) { }

  ngOnInit() {
    this.classDetailService.getClasses().subscribe((x) => {
      this.dataSource = new MatTableDataSource<Class>(x);
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
      this.dataSource.sort = this.sort;
    });
    this.selection = new SelectionModel<Class>(true, []);
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
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}