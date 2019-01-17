import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student/student.model';


@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit {

  @Input() student: Student;
  @Output() notify: EventEmitter<Student> = new EventEmitter<Student>();
  private selectStudentId: number;
  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this.selectStudentId = +this._route.snapshot.paramMap.get('Id');
  }

  handleClick() {
    this.notify.emit(this.student);
  }
}
