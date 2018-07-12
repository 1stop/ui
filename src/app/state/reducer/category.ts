import { createEntityAdapter } from '@ngrx/entity';
import { Category } from '../../model/category';
import { EntityState } from '@ngrx/entity';
import * as category from '../actions/category';

const categoryAdapter = createEntityAdapter<Category>();
interface CategoryState extends EntityState<Category> {
    loading: boolean;
}

const initialState: CategoryState = {
    ids: [],
    entities: {},
    loading: false
};

export function categoryReducer(state: CategoryState = initialState, action: category.Action) {
    switch (action.type) {
    case category.ADD_ALL:
        return categoryAdapter.addAll(action.categories, state);
    default:
      return state;
    }
}
