import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  public user: Observable<firebase.User>;
  public userDetails = new BehaviorSubject<firebase.User>(null);

  constructor(
    protected _firebaseAuth: AngularFireAuth,
    protected router: Router,
  ) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails.next(user);
        }
        else {
          this.logout();
        }
      }
    );
  }

  signInWithEmail(email, password) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  isLoggedIn() {
    return this.userDetails
      .pipe(
        map(user => !!user)
      );
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/auth/login']));
  }
}
