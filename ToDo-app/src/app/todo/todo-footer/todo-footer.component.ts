import { Component, OnInit } from '@angular/core';
import * as fromFilter from '../../filter/filter.actions';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Todo } from '../todo-model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  filtrosValidos: fromFilter.validFilters [] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFilter.validFilters;
  pendientes: number;


  constructor(private store: Store<AppState>) {

  }
  ngOnInit() {
    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.contarPendientes(state.todos);

    });
  }

  cambiarFiltro( nuevoFiltro: fromFilter.validFilters) {
    const accion = new fromFilter.SetFilterAction(nuevoFiltro);
    this.store.dispatch(accion);
  }

  contarPendientes( todos: Todo[]) {
    this.pendientes = todos.filter( todo => !todo.completado).length;
  }
}
