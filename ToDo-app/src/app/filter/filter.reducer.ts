
import * as fromFilter from './filter.actions';

const estadoInicial: fromFilter.validFilters = 'todos';

export function filterReducer ( state = estadoInicial, action: fromFilter.acciones): fromFilter.validFilters {

    switch ( action.type ) {

        case fromFilter.SET_FILTER:
           return action.filter;

        default:
            return state;
    }


}