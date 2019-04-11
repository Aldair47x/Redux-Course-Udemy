import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor( private afAuth: AngularFireAuth, private router: Router, private afDb: AngularFirestore) { }


  crearUsuario(email, nombre: string, password) {

    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(resp => {
      console.log(resp);
      const user: User = {
        uid: resp.user.uid,
        name: nombre,
        email: resp.user.email
      };

      this.afDb.doc(`${ user.uid }/usuario`)
        .set( user )
        .then( () => {
          this.router.navigate(['/']);
        });
    })
    .catch(error => {
      console.error(error);

      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: error.message
      });

    });

  }


  ingresarUsuario(email, nombre, password) {

    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(resp => {
      console.log(resp);
      this.router.navigate(['/']);
    })
    .catch(error => {
      console.error(error);

      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: error.message
      });

    });

  }


  logOut() {

    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      console.log(fbUser);
    });
  }

  isAuth( ) {
    return this.afAuth.authState
    .pipe(
      map( fbUser => {
        if (fbUser == null) {
          this.router.navigate(['/login']);
        }
        return fbUser != null;
      })

    );
  }
}
