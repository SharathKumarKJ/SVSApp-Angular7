import { Component } from '@angular/core';
import { FormBuilder, Validators, NgForm, FormControl, FormGroup } from '@angular/forms';
import { Class } from '../class-detail/class.model';
import { ClassDetailService } from '../shared/class-detail.service';
import { Student } from './student.model';
import { StudentService } from '../shared/student.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent {

  studentForm: FormGroup;

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
      CasteName: null,
      DateofBirth: null,
      ClassDetail: null,
      Address1: null,
      Address2: null,
      City: null,
      State: null,
      PostalCode: null,
      Gender: null,
      Nationality: null,
      IsActive: true
    };

  IsEdit = false;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private classService: ClassDetailService, private studentService: StudentService, private toastr: ToastrService) {
  }

  ngOnInit() {
    const id = + this.route.snapshot.paramMap.get('Id');
    if (id > 0) {
      this.IsEdit = true;
      this.FillDefaultvaluesForForm();
      this.GetStudent(id);
    }
    else {
      this.FillDefaultvaluesForForm();
    }
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

  OnSubmit() {

    var studentId = this.student.Id;
    this.student = this.studentForm.value;
    this.student.ClassDetail = this.classDetails.find(x => x.ClassName == this.studentForm.value.ClassDetail);
    this.student.Id = studentId;
    if (this.IsEdit == false) {
      this.AddStudent();
    }
    else {
      console.log(this.student);
      this.UpdateStudent();
    }
  }


  AddStudent() {
    this.studentService.AddStudent(this.student).subscribe((data: any) => { }, (error: any) => { this.showError(""); });
  }

  UpdateStudent(): any {
    this.studentService.UpdateStudent(this.student).subscribe((data: any) => { }, (error: any) => { this.showError(""); });
  }

  GetStudent(id: number): any {
    this.studentService.GetStudent(id).subscribe((data: any) => {
      this.student = data;
      this.FillStudentForm();
    }, (error: any) => { this.showError(error) });
  }


  private FillDefaultvaluesForForm() {
    this.studentForm = this.fb.group({
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
        Validators.required, Validators.minLength(6), Validators.maxLength(6)
      ])
      ],
      Gender: ['Male', Validators.required],
      Nationality: ['Indian', Validators.required],
      IsActive: new FormControl({ value: true, disabled: !this.IsEdit }, Validators.required),
    });
    this.GetClasses();
  }


  private FillStudentForm() {
    this.studentForm.patchValue({
      FirstName: this.student.FirstName,
      LastName: this.student.LastName,
      FatherName: this.student.FatherName,
      MotherName: this.student.MotherName,
      FatherMobileNumber: this.student.FatherMobileNumber,
      MotherMobileNumber: this.student.MotherMobileNumber,
      STSCode: this.student.STSCode,
      CasteName: this.student.CasteName,
      DateofBirth: this.student.DateofBirth,
      ClassDetail: this.student.ClassDetail.ClassName,
      Address1: this.student.Address1,
      Address2: this.student.Address2,
      City: this.student.City,
      State: this.student.State,
      PostalCode: this.student.PostalCode,
      Gender: this.student.Gender,
      Nationality: this.student.Nationality,
      IsActive: this.student.IsActive,
    });

  }
}
