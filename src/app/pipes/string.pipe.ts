import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'string'
})
export class StringPipe implements PipeTransform {
  transform(value: string, args: string): any {
    if (!value) return;
    
    let str = '';

    if (args === 'mykad') {
      str = str.concat(value.substr(0, 6), '-', value.substr(6, 2), '-', value.substr(8));
    }

    return str;
  }
}