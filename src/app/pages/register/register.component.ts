import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import swal from 'sweetalert2';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup

  loading: boolean = false

  // public users: FirebaseListObservable<User[]>

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })
  }


  save() {
    if (this.userForm.invalid) {
      swal.fire(
        'Form Invalid',
        'Please Fill up the form',
        'error'
      )
      return
    }

    if(this.userForm.value.password != this.userForm.value.confirmPassword) {
      swal.fire(
        'Form Invalid',
        'Password and confirm password doesn\'t match',
        'error'
      )

      this.userForm.patchValue({
        confirmPassword: ''
      })

      return
    }

    let form = this.userForm.value
    this.loading = true

    this.authService.register(form).subscribe(data => {
      let user: User = {
        uid: data.user.uid,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email
      }
      this.userService.createUser(user).subscribe(data => {
        this.loading

        swal.fire(
          'Registration Successful',
          'User Successfully Created',
          'success'
        )

        this.router.navigate(['/'])
      })
    }, err => {
      this.loading = false
      swal.fire(
        'Registration Unsuccessful',
        err.message,
        'error'
      )
    })
  }

}
