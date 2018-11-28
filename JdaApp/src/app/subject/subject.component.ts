import { Component } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { Subject } from './subject.model';
import { SubjectService } from '../shared/subject.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent {
  addressForm = this.fb.group({
    SubjectName: null,

  });

  subject: Subject =
    {
      Id: 0,
      SubjectName: " "
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

  OnSubmit(form: NgForm) {

    this.subjectService.AddSubejct(this.subject).subscribe(
      () => { this.resetForm(form); },
      (error: any) => { this.showError(error) },
      () => { this.showSuccess() }
    );
  }

  resetForm(form?: NgForm) {
    if (form != null)
      this.subject =
        {
          Id: 0,
          SubjectName: '',
        }
  }
}
