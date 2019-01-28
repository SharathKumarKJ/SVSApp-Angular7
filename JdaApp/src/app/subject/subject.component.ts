import { Component } from '@angular/core';
import { FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { Subject } from './subject.model';
import { SubjectService } from '../shared/subject.service';
import { ToastrService } from 'ngx-toastr';
import { ALERT } from '../shared/alert';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent {

  subjectForm = this.fb.group({
    SubjectName: null,
    IsActive: new FormControl({ value: true, disabled: true }, Validators.required),

  });

  subject: Subject =
    {
      Id: 0,
      SubjectName: " ",
      IsActive: true
    };
    canShow: boolean = false;
    alert: any;

  constructor(private fb: FormBuilder, private subjectService: SubjectService, private toastr: ToastrService) 
  { 
     this.alert = ALERT.ALERTS[0];
    this.canShow = false;}

  showSuccess() {
    this.toastr.success('Success!');
  }

  showError(error: any) {
    this.toastr.error('Unable to add Subject detail !' + error, 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Loaded');
  }

  OnSubmit() {
    this.alert = ALERT.ALERTS[0];
    this.subject = this.subjectForm.value;
    this.subjectService.AddSubejct(this.subject).subscribe(
      () => { this.subjectForm.reset() },
      (error: any) => { this.showError(error) },
      () => { this.showSuccess(); this.canShow=true; });
  }
  close(alert: any) {
    this.canShow = false;
  }
}
