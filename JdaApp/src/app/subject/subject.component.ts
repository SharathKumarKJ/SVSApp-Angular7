import { Component } from '@angular/core';
import { FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { Subject } from './subject.model';
import { SubjectService } from '../shared/subject.service';
import { ToastrService } from 'ngx-toastr';

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


  constructor(private fb: FormBuilder, private subjectService: SubjectService, private toastr: ToastrService) { }

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
    this.subject = this.subjectForm.value;
    this.subjectService.AddSubejct(this.subject).subscribe(
      () => { this.subjectForm.reset() },
      (error: any) => { this.showError(error) },
      () => { this.showSuccess() });
  }

}
