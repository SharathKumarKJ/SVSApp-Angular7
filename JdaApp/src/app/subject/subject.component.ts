import { Component } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { Subject } from './subject.model';
import { SubjectService } from '../shared/subject.service';

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
 
 
  constructor(private fb: FormBuilder, private subjectService :SubjectService) {}

  OnSubmit(form: NgForm) {
    
    this.subjectService.AddSubejct(this.subject).subscribe((data: any) => {
      alert('Subject has been added successfully !');
        this.resetForm(form);
    });
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
