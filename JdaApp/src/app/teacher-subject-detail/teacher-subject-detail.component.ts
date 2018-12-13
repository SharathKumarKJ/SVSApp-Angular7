
import { Component } from '@angular/core';
import { FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { Class } from '../class-detail/class.model';
import { ClassDetailService } from '../shared/class-detail.service';
import { ToastrService } from 'ngx-toastr';
import { TeacherSubject } from './teacher-subject.model';
import { SubjectService } from '../shared/subject.service';
import { Subject } from '../subject/subject.model';
import { TeacherSubjectDetailService } from '../shared/teacher-subject-detail.service';
import { TeacherService } from '../shared/teacher.service';
import { Teacher } from '../teacher/teacher.model';

@Component({
  selector: 'app-teacher-subject-detail',
  templateUrl: './teacher-subject-detail.component.html',
  styleUrls: ['./teacher-subject-detail.component.scss'],
})
export class TeacherSubjectDetailComponent {

  teacherSubjectForm = this.fb.group({
    Teacher: [null, Validators.required],
    Subject: [null, Validators.required],
    ClassDetail: [null, Validators.required],
    IsActive: new FormControl({ value: true, disabled: true }, Validators.required),
  });

  classDetails: Class[];
  subjects: Subject[];
  teachers: Teacher[];

  teacherSubject: TeacherSubject =
    {
      Id: 0,
      Teacher: null,
      Subject: null,
      ClassDetail: null,
      IsActive:true
    };


  constructor(private fb: FormBuilder, private classService: ClassDetailService, private subjectService: SubjectService, private teacherSubjectDetailService: TeacherSubjectDetailService, private teacherService: TeacherService, private toastr: ToastrService) {

  }
  ngOnInit() {
    this.GetTeachers()
    this.GetSubjects();
    this.GetClasses();
  }

  showSuccess() {
    this.toastr.success('Success!');
  }

  showError(error: any) {
    this.toastr.error('Unable to add student detail ! ' + error, 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }

  private GetClasses() {
    this.classService.getClasses().subscribe((data: any) => {
      this.classDetails = data;
    }, (error: any) => { this.showError(error) });
  }
  private GetSubjects() {
    this.subjectService.GetSubjects().subscribe((data: any) => {
      this.subjects = data;
    }, (error: any) => { this.showError(error) });
  }

  GetTeachers(): any {
    this.teacherService.GetTeachers().subscribe((data: any) => {
      this.teachers = data;
    }, (error: any) => { this.showError(error) });
  }


  onSubmit() {
    this.teacherSubject = this.teacherSubjectForm.value;
    this.teacherSubject.ClassDetail = this.classDetails.find(x => x.ClassName == this.teacherSubjectForm.value.ClassDetail);
    this.teacherSubject.Subject = this.subjects.find(x => x.SubjectName == this.teacherSubjectForm.value.Subject);
    this.teacherSubject.Teacher = this.teachers.find(x => x.FirstName == this.teacherSubjectForm.value.Teacher);
    this.teacherSubjectDetailService.AddTeacherSubject(this.teacherSubject).subscribe(
      (data: any) => { },
      (error: any) => { this.showError(""); }

      );

  }
}
