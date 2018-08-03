import { createEntityAdapter } from '@ngrx/entity';
import { Text } from '../../model/text';
import { EntityState } from '@ngrx/entity';
import * as text from '../actions/text';

const textAdapter = createEntityAdapter<Text>();
interface TextState {
    loading: boolean;
    category: number;
    texts: { [name: string]: EntityState<Text>};
}

const initialState: TextState = {
    loading: false,
    category: undefined,
    texts: {}
};

export function textReducer(state: TextState = initialState, action: text.Action) {
    switch (action.type) {
    case text.ADD_ALL:
        return { ...state, texts: immutableAdd(state.texts, action.category, action.text)};
    case text.SET_CATEGORY:
        return { ...state, category: action.category};
    default:
      return state;
    }
}


function immutableAdd(obj, key, val) {
    return Object.assign({}, obj, {
       [key] : val
    });
}
