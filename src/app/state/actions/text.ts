import { Action } from '@ngrx/store';

export const CREATE = '[Text] CREATE';
export const UPDATE = '[Text] UPDATE';
export const READ = '[Text] READ';

export const QUERY = '[Text] QUERY';

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
