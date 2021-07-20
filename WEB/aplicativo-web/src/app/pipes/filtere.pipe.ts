import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtere'
})
export class FilterePipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPosts = [];
    for(const electrolinera of value){
      if(electrolinera.name.indexOf(args) > -1 || electrolinera.estado.indexOf(args) > -1){
         resultPosts.push(electrolinera);
      };
    };
    return resultPosts;
  }

}
