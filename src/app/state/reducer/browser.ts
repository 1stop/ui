// counter.ts
import * as browser from '../actions/browser';
import { Action } from '@ngrx/store';

interface InitialState {
    searchbar: boolean;
}

const initialState = {
    searchbar: true
};

export function browserReducer(state: InitialState = initialState, action: Action) {
    switch (action.type) {
    case browser.SEARCHBAR_ON:
        return { ...state, searchbar: true };
    case browser.SEARCHBAR_OFF:
        return { ...state, searchbar: false };
    default:
      return state;
  }
}
