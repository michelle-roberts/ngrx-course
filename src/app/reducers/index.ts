import {ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import { routerReducer } from "@ngrx/router-store";

export interface AppState {}

// Block below is Router reducer set up for Time travel debugger ( Step 1 set up found in app.module.ts )
export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer
}

// MetaReducer
export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        return reducer(state, action)
    }
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];
