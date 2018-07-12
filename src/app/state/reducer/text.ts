import { createEntityAdapter } from '@ngrx/entity';
import { Text } from '../../model/text';
import { EntityState } from '@ngrx/entity';
import * as text from '../actions/text';
import { Action } from '@ngrx/store';

const textAdapter = createEntityAdapter<Text>();
interface TextState {
    loading: boolean;
    texts: { [name: string]: EntityState<Text>};
}

const initialState: TextState = {
    loading: false,
    texts: {}
};

export function textReducer(state: TextState = initialState, action: Action) {
    switch (action.type) {
    default:
      return state;
    }
}
