import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subject } from '../subject/subject.model';
import { SubjectService } from '../shared/subject.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';
import { Router } from '@angular/router';
@Component({
  selector: 'app-browse-subject',
  templateUrl: './browse-subject.component.html',
  styleUrls: ['./browse-subject.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class BrowseSubjectComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoadingResults = true;
  columnsToDisplay: string[] =
    [
      'select',
      'Id',
      'SubjectName',
    ];
    exportAsConfig: ExportAsConfig = {
      type: 'pdf',
      elementId: 'subjectTable',
      options: { // html-docx-js document options
        orientation: 'landscape',
        margins: {
          top: '20'
        }
      }
    }
  dataSource: MatTableDataSource<Subject>;
  selection: SelectionModel<Subject>;
  constructor(private subjectService: SubjectService,private exportAsService: ExportAsService , private router: Router) { }

  ngOnInit() {
    this.subjectService.GetSubjects().subscribe((x) => {
      this.dataSource = new MatTableDataSource<Subject>(x);
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
      this.dataSource.sort = this.sort;
    });
    this.selection = new SelectionModel<Subject>(true, []);
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
    this.exportAsService.save(this.exportAsConfig, 'Subjects');
    // this.exportAsService.get(this.config).subscribe(content => {
    //   console.log(content);
    // });
  }
  refresh(): void {
    window.location.reload();
  }

  onClick(subjectId: number) {
    this.router.navigate(
      ['/subject', subjectId]
      , { queryParams: { 'searchTerm': 'searchTerm', 'testParam': 'testvalue' } }
    );
  }
}