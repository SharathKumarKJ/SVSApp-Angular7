import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Teacher } from '../teacher/teacher.model';
import { TeacherService } from '../shared/teacher.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { SupportedExtensions, ExportAsConfig, ExportAsService } from 'ngx-export-as';

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
      'Gender',
      'Address1',
      'Address2',

    ];

  selection: SelectionModel<Teacher>;
  dataSource: MatTableDataSource<Teacher>;
  
  exportAsConfig: ExportAsConfig = {
    type: 'pdf',
    elementId: 'teacherTable',
    options: { // html-docx-js document options
      orientation: 'landscape',
      margins: {
        top: '20'
      }
    }
  }
  constructor(private teacherService: TeacherService,private router: Router,private exportAsService: ExportAsService ) { }

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
  exportAs(type: SupportedExtensions) {
    this.exportAsConfig.type = type;
    this.exportAsService.save(this.exportAsConfig, 'Teachers');
    // this.exportAsService.get(this.config).subscribe(content => {
    //   console.log(content);
    // });
  }
  refresh(): void {
    window.location.reload();
  }

  onClick(teacherId: number) {
    this.router.navigate(
      ['/teacher', teacherId]
      , { queryParams: { 'searchTerm': 'searchTerm', 'testParam': 'testvalue' } }
    );
  }
}

