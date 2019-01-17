import { Component, OnInit } from '@angular/core';
import { Teacher } from '../teacher/teacher.model';
import { TeacherService } from '../shared/teacher.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {

  Teachers: Teacher[];
  filterdTeacher: Teacher[];
  employeeToDisplay: Teacher;
  private arrayIndex: 1;
  dataFromChild: Teacher;
  private _searchTerm: string;


  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filterdTeacher = this.filterdTeachers(value);
  }
  constructor(private TeacherService: TeacherService
    , private _router: Router
    , private _route: ActivatedRoute) { }

  ngOnInit() {
    this.GetTeachers()
  }

  private GetTeachers() {
    this.TeacherService.GetTeachers().subscribe((x) => {
      this.Teachers = x;
      if (this._route.snapshot.queryParamMap.has('searchTerm')) {
        this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
      }
      else {
        this.employeeToDisplay = this.Teachers[0];
        this.filterdTeacher = this.Teachers;
      }
    });
  }

  filterdTeachers(searchTerm: string): Teacher[] {

    return this.Teachers.filter(x => x.FirstName.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) != -1)

  }
  nextTeacher(): void {
    if (this.arrayIndex <= 2) {
      this.employeeToDisplay = this.Teachers[this.arrayIndex];
      this.arrayIndex++;
    }
    else {
      this.employeeToDisplay = this.Teachers[0];
      this.arrayIndex = 1;
    }
  }

  handleNotify(eventData: Teacher) {
    this.dataFromChild = eventData;
  }


  onClick(TeacherId: number) {

    this._router.navigate(
      ['/teacher', TeacherId]
      , { queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testvalue' } }
    );

  }


}
