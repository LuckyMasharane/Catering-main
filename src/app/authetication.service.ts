import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth"
import { User } from './user';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AutheticationService {

  userData: any;
  userInfo: User;

  constructor(public afStore: AngularFirestore, public ngFireAuth: AngularFireAuth, public router: Router) { }

  SignIn(email, password) {
    let user: any;
    let message = "";
    return firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
      user = result
      console.log(result);

      if (user) {

        message = user.user.email + " has successfully logged in"
        localStorage.setItem('userID', user.user.uid);
        console.log(localStorage.getItem('userID'));
        console.log(message);
      } else {
        console.log(message);
      }
      return user.user.email
    });
  }


  RegisterUser(user) {
    // let user:any;
    let message = "";
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {

        if (res) {
          console.log(res);
          message = "successfully registered";
          localStorage.setItem('userID', res.user.uid);
          console.log(localStorage.getItem('userID'));
          console.log(message);
          firebase.database().ref('users/' + res.user.uid).set({

            fullname: user.fullname,
            email: user.email,
            password: user.password
          });
          console.log(message);

        } else {

        }

      }, err => {
        message = err.message;
        console.log(message)
      })
  }

  PasswordRecover(passwordResetEmail) {
    return firebase.auth().sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email has been sent, please check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }
  SignOut() {
    return firebase.auth().signOut().then(() => {
      localStorage.removeItem('userID');

    })
  }
}

