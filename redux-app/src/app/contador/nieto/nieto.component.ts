import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ResetAction } from '../contador.action';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styles: []
})
export class NietoComponent implements OnInit {
  contador: number;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select('contador').subscribe( contador => {
      this.contador = contador;
    });
  }

  Reset() {
    const action = new ResetAction();
    this.store.dispatch(action);
  }

}
