import { Directive, Optional, Self } from '@angular/core';
import { FlexDirective } from '@angular/flex-layout';

@Directive({
  selector: '[splitArea]',
  host: {
    style: 'overflow: auto;'
  }
})
export class SplitAreaDirective {
  constructor(@Optional() @Self() public flex: FlexDirective) { }
}
