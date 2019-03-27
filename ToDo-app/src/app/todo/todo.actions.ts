import {Action } from '@ngrx/store';


export const AGREGAR_TODO = '[TODO] Agregar todo';
export const TOGGLE_TODO = '[TODO] TOGGLE todo';
export const TOGGLE_ALL_TODO = '[TODO] TOGGLE ALL todo';
export const EDITAR_TODO = '[TODO] Edit todo';
export const BORRAR_TODO = '[TODO] Delate todo';
export const CLEAR_DONE = '[Filter] clear done';


export class AgregarTodoAction implements Action {

    readonly type  = AGREGAR_TODO;

    constructor(public texto: string) {}
}

export class ToggleAllTodoAction implements Action {

    readonly type  = TOGGLE_ALL_TODO;

    constructor(public completado: boolean) {}
}

export class ToggleTodoAction implements Action {

    readonly type  = TOGGLE_TODO;

    constructor(public id: number) {}
}

export class EditarTodoAction implements Action {

    readonly type  = EDITAR_TODO;

    constructor(public id: number, public texto: string) {}
}

export class BorrarTodoAction implements Action {

    readonly type  = BORRAR_TODO;

    constructor(public id: number) {}
}

export class ClearFilterAction implements Action {

    readonly type = CLEAR_DONE;
    constructor( public completado: boolean) {}
}

export type Acciones = AgregarTodoAction |
                        ToggleTodoAction |
                        BorrarTodoAction |
                        ToggleAllTodoAction |
                        ClearFilterAction |
                        EditarTodoAction;

