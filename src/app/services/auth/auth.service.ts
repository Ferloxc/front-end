import { Injectable } from '@angular/core';
import { FacebookAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentData,
} from '@angular/fire/compat/firestore';
import { User } from '../../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: any;

  constructor(
    private firestore: AngularFirestore,
    private firebaseAuth: AngularFireAuth,
    private router: Router
  ) {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  FacebookAuth() {
    return this.AuthLogin(new FacebookAuthProvider());
  }

  AuthLogin(provider: FacebookAuthProvider) {
    return this.firebaseAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  userLoggued(): Promise<any> {
    return new Promise(async (resolve, _rejects) => {
      await this.firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  }

  SignIn(email: string, password: string) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async SignUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    // console.log(email, password);
    let result = null;
    try {
      result = await this.firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (result) {
        this.SendVerificationMail();
        this.SetUserData(result.user, firstName, lastName);
      }
    } catch (err: any) {
      window.alert(err.message);
    }
    return result;
  }

  SendVerificationMail() {
    return this.firebaseAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

  SetUserData(user: any, firstName: string, lastName: string) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      firstName: firstName,
      lastName: lastName,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  getUserData() {
    let user = JSON.parse(localStorage.getItem('user')!);
    console.log(user);
    return user;
  }

  isAuthenticated() {
    return this.firebaseAuth.authState.pipe(first());
  }

  SignOut() {
    this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
