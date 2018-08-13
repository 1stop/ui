import { Action } from '@ngrx/store';
import { Text } from '../../model/text';

export const CREATE = '[Text] CREATE';
export const UPDATE = '[Text] UPDATE';
export const READ = '[Text] READ';
export const ADD_ALL = '[Text] ADD ALL';
export const SET_CATEGORY = '[Text] SET CATEGORY';
export const DELETE = '[Text] DELETE';
export const CLEAR = '[Text] CLEAR';

export class Create implements Action {
    readonly type = CREATE;
    constructor(public category: string, public text: Text) {}
}

export class Update implements Action {
    readonly type = UPDATE;
    constructor(public category: string, public text: Text) {}
}

export class Delete implements Action {
    readonly type = DELETE;
    constructor(public category: number, public text: number) {}
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
    constructor(public category: number) {}
}

export class Clear implements Action {
    readonly type = CLEAR;
}

export type Action = Create
    | Update
    | Read
    | AddAll
    | SetCategory
    | Delete
    | Clear;