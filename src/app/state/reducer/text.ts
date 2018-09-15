import { createEntityAdapter } from '@ngrx/entity';
import { Text } from '../../model/text';
import { EntityState } from '@ngrx/entity';
import * as text from '../actions/text';
import keyBy from 'lodash-es/keyBy';
import get from 'lodash-es/get';

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
        return {
            ...state,
            texts: {
                ...state.texts,
                [action.category]: textAdapter.addAll(action.text, get(state.texts, action.category, {ids: [], entities: {}}))
            }
        };
    case text.SET_CATEGORY:
        return { ...state, category: action.category};
    case text.CREATE:
        return {
            ...state,
            texts: {
                ...state.texts,
                [action.category]: textAdapter.addOne(action.text, get(state.texts, action.category, {ids: [], entities: {}}))
            }
        };
    case text.UPDATE:
        return {
            ...state,
            texts: {
                ...state.texts,
                [action.category]: textAdapter.updateOne(action.text, get(state.texts, action.category, {ids: [], entities: {}}))
            }
        };
    case text.DELETE:
        return {
            ...state,
            texts: {
                ...state.texts,
                [action.category]: textAdapter.removeOne(action.id, get(state.texts, action.category, {ids: [], entities: {}}))
            }
        };
    case text.CLEAR:
        return initialState;
    default:
      return state;
    }
}
