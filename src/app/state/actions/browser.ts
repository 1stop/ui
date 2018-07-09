// counter.ts
import { Action } from '@ngrx/store';

export const SEARCHBAR_ON = '[Browser] SEARCHBAR_ON';
export const SEARCHBAR_OFF = '[Browser] SEARCHBAR_OFF';

export class SearchOn implements Action {
    readonly type = SEARCHBAR_ON;
}

export class SearchOff implements Action {
    readonly type = SEARCHBAR_OFF;
}

export type Action = SearchOn | SearchOff ;
