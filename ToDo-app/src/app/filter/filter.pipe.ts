import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../todo/todo-model';

import * as fromFilter from './filter.actions';

@Pipe({
  name: 'filterToDo'
})
export class FilterPipe implements PipeTransform {

  transform(todos: Todo[], filter: fromFilter.validFilters): Todo[] {
    switch (filter) {
      case 'completados':
        return todos.filter( todo => todo.completado );
      case 'pendientes':
        return todos.filter( todo => !todo.completado );

      default:
        return todos;
    }

  }

}
