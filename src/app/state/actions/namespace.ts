import { Action } from '@ngrx/store';
import { Namespace } from '../../model/namespace';
import { Update as Up } from '@ngrx/entity';

export const CREATE = '[Namespace] CREATE';
export const UPDATE = '[Namespace] UPDATE';
export const READ = '[Namespace] READ';
export const ADD_ALL = '[Namespace] ADD ALL';
export const QUERY = '[Namespace] QUERY';

export class Create implements Action {
    readonly type = CREATE;
    constructor(public namespaces: Namespace) {}
}

export class Update implements Action {
    readonly type = UPDATE;
    constructor(public namespaces: Up<Namespace>) {}
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
    constructor(public namespaces: Namespace[]) {}
}


export type Action = Create
    | Update
    | Read
    | AddAll
    | Query;
