import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { StudentService } from '../shared/student.service';
import { Student } from '../student/student.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';
import { Router } from '@angular/router';

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
      'select',
      'Id',
      'Name',
      'Class',
      'FatherName',
      'MotherName',
      'STSCode',
      'DateofBirth',
      'Gender',
      'Nationality',
      'FatherMobileNumber',
      'MotherMobileNumber',
      'Address1',
      'Address2',
      'City',
      'State',
      'PostalCode',
    ];

  dataSource: MatTableDataSource<Student>;

  selection: SelectionModel<Student>;

  exportAsConfig: ExportAsConfig = {
    type: 'pdf',
    elementId: 'studentTable',
    options: { // html-docx-js document options
      orientation: 'landscape',
      margins: {
        top: '20'
      }
    }
  }

  constructor(private studentService: StudentService, private exportAsService: ExportAsService , private router: Router) { }

  ngOnInit() {
    this.studentService.GetStudents().subscribe((x) => {
      this.dataSource = new MatTableDataSource<Student>(x);
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
      this.dataSource.sort = this.sort;
    });

    this.selection = new SelectionModel<Student>(true, []);

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
    this.exportAsService.save(this.exportAsConfig, 'Students');
    // this.exportAsService.get(this.config).subscribe(content => {
    //   console.log(content);
    // });
  }
  refresh(): void {
    window.location.reload();
  }

  onClick(studentId: number) {
    this.router.navigate(
      ['/student', studentId]
      , { queryParams: { 'searchTerm': 'searchTerm', 'testParam': 'testvalue' } }
    );
  }
}
