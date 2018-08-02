import { Action } from '@ngrx/store';
import { Category } from '../../model/category';

export const CREATE = '[Category] CREATE';
export const UPDATE = '[Category] UPDATE';
export const READ = '[Category] READ';
export const ADD_ALL = '[Category] ADD ALL';
export const QUERY = '[Category] QUERY';

export class Create implements Action {
    readonly type = CREATE;
    constructor(public payload: Category) {}
}

export class Update implements Action {
    readonly type = UPDATE;
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
    | Query;
