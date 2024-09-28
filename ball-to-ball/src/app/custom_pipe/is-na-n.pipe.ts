import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isNaN',
  standalone: true
})
export class IsNaNPipe implements PipeTransform {

  transform(value: number): any {
     const nanVal= !isNaN(value)?true:false
     if(nanVal===true){
      return value;
     }
     else {
      return 0;
  }
  }

}
