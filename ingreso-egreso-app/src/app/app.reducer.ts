
import * as  fromUi from './shared/ui.reducers';
import * as fromAuth from './auth/auth.reducer';
import * as formIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';
import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
    ui: fromUi.State;
    auth: fromAuth.AuthState;
    ingresoEgreso: formIngresoEgreso.IngresoEgresoState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUi.uiReducer,
    auth: fromAuth.authReducer,
    ingresoEgreso: formIngresoEgreso.ingresoEgresoReducer

};




