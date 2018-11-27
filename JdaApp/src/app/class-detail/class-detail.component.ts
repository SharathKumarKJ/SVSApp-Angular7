import { Component } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Class } from './class.model';
import { ClassDetailService } from '../shared/class-detail.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss'],
})
export class ClassDetailComponent {
  addressForm = this.fb.group({
    company: null,

  });

  classDetail: Class =
    {
      Id: 0,
      ClassName: " "
    };
 

  constructor(private fb: FormBuilder, private  classDetailService: ClassDetailService) { }

  OnSubmit(form: NgForm) {
    
    this.classDetailService.AddClassDetail(this.classDetail).subscribe((data: any) => {
      alert('Class name has been added successfully !');
        this.resetForm(form);
    });
  }

  resetForm(form?: NgForm) {
    if (form != null)
      this.classDetail =
        {
          Id: 0,
          ClassName: '',
        }
  }

}
