import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';
import { Observable, map, of, switchMap } from 'rxjs';
import { AppUser } from '../_models/AppUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {}

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return this.afAuth.signInWithRedirect(provider);
  }

  signInWithEmilAndPassword(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signUpWithCredentials(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.afAuth.signOut();
  }

  getAuthState() {
    return this.afAuth.authState;
  }

  getAppUser$(): Observable<AppUser | null> {
    return this.afAuth.authState.pipe(
      switchMap((state) => {
        if (!state) return of(null);
        return this.userService.get(state.uid) as Observable<AppUser>;
      })
    );
  }
}
