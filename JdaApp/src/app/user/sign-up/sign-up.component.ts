import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {

  constructor(private userService: UserService, private toastr: ToastrService) {

  }
  user: User =
    {
      UserName: null,
      Password: null,
      FirstName: null,
      LastName: null,
      Email: null
    };
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      this.user =
        {
          UserName: '',
          Password: '',
          FirstName: '',
          LastName: '',
          Email: ''
        }
  }
  showSuccess() {
    this.toastr.success('Success!');
  }

  showError(error: any) {
    this.toastr.error('Unable to register ! : '+error, '');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Loaded');
  }
  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value).subscribe((data: any) => {
      if (data.Succeeded) {
        this.resetForm(form);
        this.showSuccess();
      }
      else {
        this.showError(data.Errors);
        console.log(data);
      }
    },
      (error: any) => { this.showError(error) },
    );
  }

}
