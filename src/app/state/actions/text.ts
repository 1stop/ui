import { Action } from '@ngrx/store';
import { Text } from '../../model/text';

export const CREATE = '[Text] CREATE';
export const UPDATE = '[Text] UPDATE';
export const READ = '[Text] READ';
export const ADD_ALL = '[Text] ADD ALL';
export const SET_CATEGORY = '[Text] SET CATEGORY';

export class Create implements Action {
    readonly type = CREATE;
}

export class Update implements Action {
    readonly type = UPDATE;
}

export class Read implements Action {
    readonly type = READ;
}

export class AddAll implements Action {
    readonly type = ADD_ALL;
    constructor(public category: string, public text: Text[]) {}
}

export class SetCategory implements Action {
    readonly type = SET_CATEGORY;
    constructor(public category: string) {}
}


export type Action = Create
    | Update
    | Read
    | AddAll
    | SetCategory;
