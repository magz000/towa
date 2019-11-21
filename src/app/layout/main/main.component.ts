import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user
  userInfo
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser()
    this.userService.getLoggedInUser(this.user.uid).subscribe(data => this.userInfo = data)
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
