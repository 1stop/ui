import { createEntityAdapter } from '@ngrx/entity';
import { Text } from '../../model/text';
import { EntityState } from '@ngrx/entity';
import * as text from '../actions/text';
import keyBy from 'lodash-es/keyBy';

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
    case text.CREATE:
        return { ...state, texts: immutableUpdate(state.texts, action.category, action.text)};
    case text.UPDATE:
        return { ...state, texts: immutableUpdate(state.texts, action.category, action.text)};
    case text.DELETE:
        return { ...state, texts: immutableDelete(state.texts, action.category, action.text)};
    case text.CLEAR:
        return initialState;
    default:
      return state;
    }
}


function immutableAdd(obj, key, val) {
    return Object.assign({}, obj, {
       [key] : keyBy(val, (v: any) => v.id)
    });
}

function immutableUpdate(obj, key, val) {
    return Object.assign({}, obj, {
        [key] : { ...obj[key], [val.id]: val}
    });
}

function immutableDelete(obj, key, id) {
    const { [id]: removed, ...remain } = obj[key];
    return Object.assign({}, obj, {
        [key] : remain
    });
}

