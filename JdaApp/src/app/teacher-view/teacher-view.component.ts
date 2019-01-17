import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Teacher } from '../teacher/teacher.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.scss']
})
export class TeacherViewComponent implements OnInit {

  @Input() teacher: Teacher;
  @Output() notify: EventEmitter<Teacher> = new EventEmitter<Teacher>();
  private selectTeacherId: number;
  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this.selectTeacherId = +this._route.snapshot.paramMap.get('Id');
  }

  handleClick() {
    this.notify.emit(this.teacher);
  }
}
