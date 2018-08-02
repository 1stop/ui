import { createEntityAdapter } from '@ngrx/entity';
import { Category } from '../../model/category';
import { EntityState } from '@ngrx/entity';
import * as category from '../actions/category';
import { Actions } from '../../../../node_modules/@ngrx/effects';

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
    case category.CREATE:
        return categoryAdapter.addOne(action.payload, state);
    case category.UPDATE:
        return categoryAdapter.updateOne(<any>{
            id : action.payload.id,
            changes: {...action.payload}}, state);
    case category.DELETE:
        return categoryAdapter.removeOne(action.id.toString(), state);
    default:
        return state;
    }
}
