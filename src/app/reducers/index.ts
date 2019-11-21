import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
  Action,
  props
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import { createAction } from '@ngrx/store';
import { User } from '../model/user.model';

// actions
export const setUsers = createAction('[Crud User] Set User', props<{users: User[]}>())
export const addUser = createAction('[Crud User] Add User', props<{user: User}>());
export const deleteUser = createAction('[Crud User] Delete User');
export const editUser = createAction('[Crud User] Update User');

//state
export interface State {
  users: User[]
}

export const initialState: State = {
  users: []
};

//reducer
const userReducer = createReducer(
  initialState,
  on(setUsers, (state, {users}) => ({ 
    ...state, 
    users: state.users = users
  })),
  on(addUser, (state, { user }) => ({
    ...state,
    user: state.users.push(user)
  })),
);


export function reducers(state: State | undefined, action: Action) {
  return userReducer(state, action)
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
