import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterep'
})
export class FilterepPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPosts = [];
    for(const electrolinera of value){
      if(electrolinera.name.indexOf(args) > -1 || electrolinera.direcion.indexOf(args) > -1){
         resultPosts.push(electrolinera);
      };
    };
    return resultPosts;
  }

}
