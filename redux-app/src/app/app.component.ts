import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { IncrementarAction, DecrementarAction } from './contador/contador.action';


interface AppState {
  contador: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  contador: number;

  constructor(private store: Store<AppState>) {
    this.store.select('contador').subscribe( contador => {
      this.contador = contador;
    });
  }

  Incrementar() {

    const accion = new IncrementarAction();

    this.store.dispatch (accion);
  }

  Decrementar() {

    const accion = new DecrementarAction();

    this.store.dispatch (accion);
  }

}

