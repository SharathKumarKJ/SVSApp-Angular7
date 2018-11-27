import { Component } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { Class } from '../class-detail/class.model';
import { ClassDetailService } from '../shared/class-detail.service';
import { Student } from './student.model';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../shared/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent {
  studentForm = this.fb.group({
    FirstName: [null, Validators.required],
    LastName: [null, Validators.required],
    FatherName: [null, Validators.required],
    MotherName: [null, Validators.required],
    FatherMobileNumber: [null, Validators.required],
    MotherMobileNumber: [null, Validators.required],
    STSCode: [null, Validators.required],
    CasteName: [null, Validators.required],
    DateofBirth: [null, Validators.required],
    ClassDetail: [null, Validators.required],
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

  classDetails: Class[];

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

  student: Student =
    {
      Id: 0,
      FirstName: null,
      LastName: null,
      FatherName: null,
      MotherName: null,
      FatherMobileNumber: null,
      MotherMobileNumber: null,
      STSCode: null,
      Caste: null,
      DateofBirth: null,
      ClassDetail: null,
      Address1: null,
      Address2: null,
      City: null,
      State: null,
      PostalCode: null,
      Gender: null,
      Nationality: null
    };

  hasUnitNumber = false;

  constructor(private fb: FormBuilder, private classService: ClassDetailService, private studentService: StudentService) { }
  ngOnInit() {
    this.GetClasses();
  }

  private GetClasses() {
    this.classService.getClasses().subscribe((data: any) => {
      this.classDetails = data;
    });
  }

  onSubmit() {
    this.student = this.studentForm.value;
    this.student.ClassDetail = this.classDetails.find(x => x.ClassName == this.studentForm.value.ClassDetail);
    this.studentService.AddStudent(this.student).subscribe((x: any) => {
      alert('Student has been added successfully !');
      this.studentForm.reset();
    });
  }
}
