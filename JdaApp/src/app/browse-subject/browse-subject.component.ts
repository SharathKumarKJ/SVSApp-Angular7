import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subject } from '../subject/subject.model';
import { SubjectService } from '../shared/subject.service';

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
      'Id',
      'SubjectName',
    ];

  dataSource: MatTableDataSource<Subject>;

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.subjectService.GetSubjects().subscribe((x) => {
      this.dataSource = new MatTableDataSource<Subject>(x);
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