import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AppUser } from '../_models/AppUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  get(uid: string): Observable<AppUser | null> {
    if (!uid) return of(null);
    return this.db
      .object('/users/' + uid)
      .valueChanges() as Observable<AppUser>;
  }

  save(user: firebase.User) {
    return this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      picture: user.photoURL,
    });
  }
}
