import * as fromTodo from './todo.actions';
import { Todo } from './todo-model';

const todo1 = new Todo('vencer a thanos');
const todo2 = new Todo('Salvar el mundo');


const estadoInicial: Todo[] = [todo1, todo2];
export function todoReducer (state = estadoInicial, action: fromTodo.Acciones): Todo[] {

    switch (action.type) {

        case fromTodo.AGREGAR_TODO:
            const todo = new Todo( action.texto );
            return [...state, todo];


        case fromTodo.BORRAR_TODO:
        return state.filter (toEdit => toEdit.id !== action.id);

        case fromTodo.CLEAR_DONE:
        return state.filter (toEdit => toEdit.completado !== action.completado);


        case fromTodo.TOGGLE_ALL_TODO:
            return state.map(toEdit => {
                return {
                    ...toEdit,
                    completado: action.completado
                };

            });


        case fromTodo.TOGGLE_TODO:
            return state.map(toEdit => {
                if (toEdit.id === action.id) {
                    return {
                        ...toEdit,
                        completado: !toEdit.completado
                    };
                } else {
                    return toEdit;
                }
            });


        case fromTodo.EDITAR_TODO:
            return state.map(toEdit => {
                if (toEdit.id === action.id) {
                    return {
                        ...toEdit,
                        texto: action.texto
                    };
                } else {
                    return toEdit;
                }
            });

        default:
            return state;
    }
}
