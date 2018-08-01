import { createEntityAdapter } from '@ngrx/entity';
import { Namespace } from '../../model/namespace';
import { EntityState } from '@ngrx/entity';
import * as namespace from '../actions/namespace';

const namespaceAdapter = createEntityAdapter<Namespace>();
interface NamespaceState extends EntityState<Namespace> {
    loading: boolean;
}

const initialState: NamespaceState = {
    ids: [],
    entities: {},
    loading: false
};

export function namespaceReducer(state: NamespaceState = initialState, action: namespace.Action) {
    switch (action.type) {
    case namespace.ADD_ALL:
        return namespaceAdapter.addAll(action.namespaces, state);
    case namespace.UPDATE:
        return namespaceAdapter.updateOne({
            id: action.namespaces.id,
            changes:  { ...action.namespaces}
        }, state);
    case namespace.CREATE:
        return namespaceAdapter.addOne(action.namespaces, state);
    default:
      return state;
    }
}
