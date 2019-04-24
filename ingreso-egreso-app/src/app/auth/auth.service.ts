import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { User } from './user.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction, UnSetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private userSubscription: Subscription = new Subscription();
  private usuario: User;

  constructor( private afAuth: AngularFireAuth,
    private router: Router,
    private afDb: AngularFirestore,
    private store: Store<AppState>) { }


  crearUsuario(email, nombre: string, password) {

    this.store.dispatch ( new ActivarLoadingAction() );

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
          this.store.dispatch( new DesactivarLoadingAction );
        });
    })
    .catch(error => {
      this.store.dispatch( new DesactivarLoadingAction );
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

    this.store.dispatch( new UnSetUserAction() );

  }

  initAuthListener() {



    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {

      if ( fbUser ) {
        this.userSubscription = this.afDb.doc(`${ fbUser.uid }/usuario`).valueChanges().subscribe( (usuarioObj: any) => {
          const newUser = new User( usuarioObj );
          this.store.dispatch( new SetUserAction(newUser) );
          this.usuario = newUser;
        });

      } else {
        this.usuario = null;
        this.userSubscription.unsubscribe();
      }


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


  getUsuario() {
    return {...this.usuario };

  }
}
