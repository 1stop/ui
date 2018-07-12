import { createEntityAdapter } from '@ngrx/entity';
import { Category } from '../../model/category';
import { EntityState } from '@ngrx/entity';
import * as category from '../actions/category';
import { Action } from '@ngrx/store';

const categoryAdapter = createEntityAdapter<Category>();
interface CategoryState extends EntityState<Category> {
    loading: boolean;
}

const initialState: CategoryState = {
    ids: [],
    entities: {},
    loading: false
};

export function categoryReducer(state: CategoryState = initialState, action: Action) {
    switch (action.type) {
    default:
      return state;
    }
}
