import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class SearchService {
  search: ReplaySubject<string> = new ReplaySubject<string>(1);
}
