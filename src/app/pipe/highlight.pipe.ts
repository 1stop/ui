import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search): string {
    if ( search ){
        search = search.split(' ').join('|');
        return search ? text.replace(new RegExp(search, 'gi'), matched => `<b>${matched}</b>`) : text;
    } else {
        return text;
    }
  }
}
