import { Action } from '@ngrx/store';

export const CREATE = '[Category] CREATE';
export const UPDATE = '[Category] UPDATE';
export const READ = '[Category] READ';

export const QUERY = '[Category] QUERY';

export class Create implements Action {
    readonly type = CREATE;
}

export class Update implements Action {
    readonly type = UPDATE;
}

export class Read implements Action {
    readonly type = READ;
}

export class Query implements Action {
    readonly type = QUERY;
    constructor(public namespace: string, public query: string) {}
}

export type Action = Create
    | Update
    | Read;
