import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  loading: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.loginForm.invalid) {
      swal.fire(
        'Form Invalid',
        'Please Fill up the form',
        'error'
      )
      return
    }

    this.loading = true

    this.authService.login(this.loginForm.value).subscribe(data => {
      this.loading = false
      this.router.navigate(['/users'])
    }, err => {
      this.loading = false
      this.loginForm.patchValue({
        password: ''
      })
      
      swal.fire(
        'Login Failed',
        err.message,
        'error'
      )
    })

  }

}
