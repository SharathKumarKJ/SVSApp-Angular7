import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Teacher } from '../teacher/teacher.model';
import { TeacherService } from '../shared/teacher.service';
import { SelectionModel } from '@angular/cdk/collections';

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
      'select',
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

  selection: SelectionModel<Teacher>;
  dataSource: MatTableDataSource<Teacher>;

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.teacherService.GetTeachers().subscribe((x) => {
      this.dataSource = new MatTableDataSource<Teacher>(x);
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
      this.dataSource.sort = this.sort;
    });
    this.selection = new SelectionModel<Teacher>(true, []);

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

