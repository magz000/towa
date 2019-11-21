import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable, from } from 'rxjs';
import { first, take, map } from 'rxjs/operators'
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public db: AngularFirestore
  ) { }

  getLoggedInUser(uid): Observable<any> {
    return this.db.collection('users').doc(uid).valueChanges()
  }

  getUsers(): Observable<any> {
    return this.db.collection('users').valueChanges()
  }

  createUser(user: User): Observable<any> {
    return from(this.db.collection('users').doc(user.uid).set(user))
  }

  editUser(user: User) {
    return from(this.db.collection('users').doc(user.uid).set(user))
  }

  deleteUser(user) {
    return from(this.db.collection('users').doc(user.uid).delete())
  }
}
