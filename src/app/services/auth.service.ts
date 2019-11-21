import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';

const TOKEN_KEY = 'aQWdsd164ds23fsf'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  login(data): Observable<any> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password))
    
  }

  logout() {
    localStorage.removeItem('user');
    return from(this.afAuth.auth.signOut())
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }


  register(data): Observable<any> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password))
  }

  // public getToken(): string {
  //   return localStorage.getItem(TOKEN_KEY);
  // }

  // public isAuthenticated(): boolean {
  //   return this.getToken() ? true : false
  // }
}
