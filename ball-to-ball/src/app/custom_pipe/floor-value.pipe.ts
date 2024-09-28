import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floorValue',
  standalone:true

})
export class FloorValuePipe implements PipeTransform {

  transform(value: any): any {
    value = parseInt(value);
    return value;
  }

}
