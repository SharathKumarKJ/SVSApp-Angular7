import { Component } from '@angular/core';
import { FormBuilder, NgForm, FormControl, Validators } from '@angular/forms';
import { Class } from './class.model';
import { ClassDetailService } from '../shared/class-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss'],
})
export class ClassDetailComponent {
  classForm = this.fb.group({
    ClassName: null,
    IsActive: new FormControl({ value: true, disabled: true }, Validators.required),

  });

  classDetail: Class =
    {
      Id: 0,
      ClassName: " ",
      IsActive: true,
    };


  constructor(private fb: FormBuilder, private classDetailService: ClassDetailService, private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Success!');
  }

  showError(error: any) {
    this.toastr.error('Unable to add Class detail ! ' + error, 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }

  OnSubmit() {
    this.classDetail = this.classForm.value;
    this.classDetailService.AddClassDetail(this.classDetail).subscribe(
      () => { this.classForm.reset() },
      (error: any) => { this.showError(error) },
      () => { this.showSuccess() });
  }
}
