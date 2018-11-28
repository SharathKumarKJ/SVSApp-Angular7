import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Teacher } from './teacher.model';
import { TeacherService } from '../shared/teacher.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent {
  teacherForm = this.fb.group({
    FirstName: [null, Validators.required],
    LastName: [null, Validators.required],
    AadharNumber: [null, Validators.required],
    PANNumber: [null, Validators.required],
    Qulification: [null, Validators.required],
    SpecialistIn: [null, Validators.required],
    Experience: [null, Validators.required],
    SubjectsHandle: [null, Validators.required],
    DateofBirth: [null, Validators.required],
    CasteName: [null, Validators.required],
    Address1: [null, Validators.required],
    Address2: null,
    City: [null, Validators.required],
    State: [null, Validators.required],
    PostalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    ],
    Gender: ['Male', Validators.required],
    Nationality: ['Indian', Validators.required]
  });

  hasUnitNumber = false;

  states = [

    { name: 'Karnataka', abbreviation: 'KA' },
    { name: 'Andhra Pradesh', abbreviation: 'AP' },
    { name: 'Assam', abbreviation: 'AS' },
    { name: 'Bihar', abbreviation: 'BR' },
    { name: 'Chhattisgarh', abbreviation: 'CG' },
    { name: 'Goa', abbreviation: 'GA' },
    { name: 'Gujarat', abbreviation: 'GJ' },
    { name: 'Haryana', abbreviation: 'HR' },
    { name: 'Himachal Pradesh', abbreviation: 'HP' },
    { name: 'Jammu and Kashmir', abbreviation: 'JK' },
    { name: 'Jharkhand', abbreviation: 'JH' },
    { name: 'Kerala', abbreviation: 'KL' },
    { name: 'Madhya Pradesh', abbreviation: 'MP' },
    { name: 'Maharashtra', abbreviation: 'MH' },
    { name: 'Manipur', abbreviation: 'MN' },
    { name: 'Meghalaya', abbreviation: 'ML' },
    { name: 'Nagaland', abbreviation: 'NL' },
    { name: 'Orissa', abbreviation: 'OR' },
    { name: 'Punjab', abbreviation: 'PB' },
    { name: 'Rajasthan', abbreviation: 'RJ' },
    { name: 'Sikkim', abbreviation: 'SK' },
    { name: 'Tamil Nadu', abbreviation: 'TN' },
    { name: 'Tripura', abbreviation: 'TR' },
    { name: 'Uttarakhand', abbreviation: 'UK' },
    { name: 'Uttar Pradesh', abbreviation: 'UP' },
    { name: 'West Bengal', abbreviation: 'WB' }
  ];

  teacher: Teacher =
    {
      Id: 0,
      FirstName: null,
      LastName: null,
      AadharNumber: null,
      PANNumber: null,
      Qulification: null,
      SpecialistIn: null,
      Experience: null,
      SubjectsHandle: null,
      DateofBirth: null,
      CasteName: null,
      Gender: null,
      Nationality: null,
      Address1: null,
      Address2: null,
      City: null,
      State: null,
      PostalCode: null,

    };

  constructor(private fb: FormBuilder, private teacherService: TeacherService, private toastr: ToastrService) { }
  ngOnInit() {
  }
  showSuccess() {
    this.toastr.success('Success!');
  }

  showError(error: any) {
    this.toastr.error('Unable to add Teacher detail !' + error, 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Loaded');
  }

  onSubmit() {
    this.teacher = this.teacherForm.value;
    this.teacherService.AddTeacher(this.teacher).subscribe(
      () => { this.teacherForm.reset() },
      (error: any) => { this.showError(error) },
      () => { this.showSuccess() });
  }
}

