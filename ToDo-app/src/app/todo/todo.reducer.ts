import * as fromTodo from './todo.actions';
import { Todo } from './todo-model';

const todo1 = new Todo('vencer a thanos');
const todo2 = new Todo('Salvar el mundo');

todo2.completado = true;

const estadoInicial: Todo[] = [todo1, todo2];
export function todoReducer (state = estadoInicial, action: fromTodo.Acciones): Todo[] {

    switch (action.type) {

        case fromTodo.AGREGAR_TODO:
            const todo = new Todo( action.texto );
            return [...state, todo];


        case fromTodo.TOGGLE_TODO:
            return state.map(toEdit => {
                if(toEdit.id === action.id){
                    return {
                        completado: !toEdit.completado
                    }
                }
            })

        default:
            return state;
    }
}
