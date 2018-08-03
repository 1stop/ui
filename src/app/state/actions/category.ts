import { Action } from '@ngrx/store';
import { Category } from '../../model/category';
import { Update as U} from '@ngrx/entity';

export const CREATE = '[Category] CREATE';
export const DELETE = '[Category] DELETE';
export const UPDATE = '[Category] UPDATE';
export const READ = '[Category] READ';
export const ADD_ALL = '[Category] ADD_ALL';
export const QUERY = '[Category] QUERY';

export class Create implements Action {
    readonly type = CREATE;
    constructor(public payload: Category) {}
}

export class Delete implements Action {
    readonly type = DELETE;
    constructor(public id: number) {}
}

export class Update implements Action {
    readonly type = UPDATE;
    constructor(public payload: U<Category>) {}
}

export class Read implements Action {
    readonly type = READ;
}

export class Query implements Action {
    readonly type = QUERY;
    constructor(public namespace: string, public query?: string) {}
}

export class AddAll implements Action {
    readonly type = ADD_ALL;
    constructor(public categories: Category[]) {}
}


export type Action = Create
    | Update
    | Read
    | AddAll
    | Query
    | Delete;
