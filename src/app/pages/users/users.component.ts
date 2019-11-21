import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2'
import { Store, select } from '@ngrx/store';
import { State, setUsers, addUser } from 'src/app/reducers';
import { User } from 'src/app/model/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$

  constructor(
    private userService: UserService,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.users$ = this.store.pipe(select('users'), map((users: any) => users.users))
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.store.dispatch(setUsers({users: data}))
    })
  }

  delete(user) {
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(user).subscribe(data => {
          swal.fire(
            'Deleted!',
            'User has been successfully deleted.',
            'success'
          )
        })
      }
    })
  }

}
