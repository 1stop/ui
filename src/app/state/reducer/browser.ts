import * as browser from '../actions/browser';
import { Action } from '@ngrx/store';

interface InitialState {
    searchbar: boolean;
    editMode: boolean;
}

const initialState = {
    searchbar: true,
    editMode: false
};

export function browserReducer(state: InitialState = initialState, action: Action) {
    switch (action.type) {
    case browser.SEARCHBAR_ON:
        return { ...state, searchbar: true };
    case browser.SEARCHBAR_OFF:
        return { ...state, searchbar: false };
    case browser.EDIT_ON:
        return { ...state, editMode: true };
    case browser.EDIT_OFF:
        return { ...state, editMode: false };
    default:
      return state;
  }
}
