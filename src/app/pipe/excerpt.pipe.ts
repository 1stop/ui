import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerpt'
})
export class ExcerptPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let index = value.search(/\w+?\s?\w+?\s\w+?\s?<b>.*/g);
    if ( index === - 1 ){
      return value;
    } else {
      return value.substring(index);
    }
  }

}
