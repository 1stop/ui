import { Action } from '@ngrx/store';

export const SEARCHBAR_ON = '[Browser] SEARCHBAR_ON';
export const SEARCHBAR_OFF = '[Browser] SEARCHBAR_OFF';
export const EDIT_OFF = '[Browser] EDIT_OFF';
export const EDIT_ON = '[Browser] EDIT_ON';

export class SearchOn implements Action {
    readonly type = SEARCHBAR_ON;
}

export class SearchOff implements Action {
    readonly type = SEARCHBAR_OFF;
}

export class EditOn implements Action {
    readonly type = EDIT_ON;
}

export class EditOff implements Action {
    readonly type = EDIT_OFF;
}


export type Action = SearchOn | SearchOff | EditOn | EditOff ;
