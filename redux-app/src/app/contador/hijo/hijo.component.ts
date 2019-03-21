import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { MultiplicarAction, DividirAction } from '../contador.action';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styles: []
})
export class HijoComponent implements OnInit {
  contador: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.store.select('contador').subscribe(contador => {
      this.contador = contador;
    });
  }


  Multiplicar() {
    const accion = new MultiplicarAction(10);
    this.store.dispatch(accion);
  }

  Dividir() {
    const accion = new DividirAction(2);
    this.store.dispatch(accion);
  }
}
