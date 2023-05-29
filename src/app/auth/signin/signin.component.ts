import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Patterns } from 'src/@seam-labs/Constants/patterns';
import { login } from 'src/@seam-labs/Models/auth/login';
import { routes } from 'src/app/core/helpers/routes';
import { WebstorgeService } from 'src/app/shared/webstorge.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public routes = routes;
  password: any;
  show = false;
  public CustomControler: any;
  form :FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
      Validators.pattern(Patterns.complexPassword),
    ]),
  });
  changePassword: boolean=false;
  
  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar

    // private spinner: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.password = 'password';
  }

  submit() {
    let body: login = {
      username: this.form.get('email')?.value.trim(),
      password: this.form.get('password')?.value.trim(),
    };
    // const Roles =[]
    // this.spinner.show();
    localStorage.setItem(
      'AccessToken',
      JSON.stringify(body.username)
    );
    this._snackBar.open('you are logged in successfully ' ,'x');

    this.router.navigateByUrl('/')

  }
  ngOnDestroy() {}

  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
}
