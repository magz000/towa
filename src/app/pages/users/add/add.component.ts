import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalBasicComponent } from 'src/app/shared/modal-basic/modal-basic.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  userForm: FormGroup

  loading: boolean = false

  @ViewChild('addModal', {static: false}) addModal: ModalBasicComponent

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      uid: [''],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })
  }

  edit(user: User) {
    this.userForm.patchValue(user)
    this.show()
  }

  save() {
    this.loading = true
    this.userService.editUser(this.userForm.value).subscribe(data => {
      this.loading = false
      swal.fire('Update Successully Saved', '', 'success')
      this.hide()
    }, err => {
      this.loading = false
      console.log(err)
    })
  }

  show() {
    this.addModal.show()
  }

  hide() {
    this.addModal.hide()
  }

}
