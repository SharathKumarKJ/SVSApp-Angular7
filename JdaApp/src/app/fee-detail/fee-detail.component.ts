
import { Component } from '@angular/core';
import { FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Fee } from './fee.model';
import { StudentService } from '../shared/student.service';
import { Student } from '../student/student.model';
import { FeeService } from '../shared/fee.service';

@Component({
  selector: 'app-fee-detail',
  templateUrl: './fee-detail.component.html',
  styleUrls: ['./fee-detail.component.scss'],
})
export class FeeDetailComponent {
  feeForm = this.fb.group({
    Student: [null, Validators.required],
    DueDate: [null, Validators.required],
    PaidDate: [null, Validators.required],
    TotalAmount: [null, Validators.required],
    PaidAmount: [null, Validators.required],
    BalanceAmount: new FormControl({ value: '00.00', disabled: true }, Validators.required),
  });

  students: Student[];

  fee: Fee =
    {
      Id: 0,
      Student: null,
      DueDate: null,
      PaidDate: null,
      TotalAmount: 0,
      PaidAmount: 0,
      BalanceAmount: 0,
    };



  constructor(private fb: FormBuilder, private studentService: StudentService, private feeService: FeeService, private toastr: ToastrService) {

  }
  ngOnInit() {
    this.GetStudents()

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

  Calculate():number {
    console.log("Calculated called...");
    return this.fee.BalanceAmount = this.fee.TotalAmount - this.fee.PaidAmount;
  }
  private GetStudents() {
    this.studentService.GetStudents().subscribe((data: any) => {
      this.students = data;
    }, (error: any) => { this.showError(error) });
  }



  onSubmit() {
    this.fee = this.feeForm.value;
    this.fee.Student = this.students.find(x => x.FirstName == this.feeForm.value.Student);
    this.feeService.AddFee(this.fee).subscribe(
      (data: any) => { },
      (error: any) => { this.showError(""); }
    );

  }
}