import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterq'
})
export class FilterqPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPosts = [];
    for(const quejas of value){
      if(quejas.Tipo.indexOf(args) > -1 || quejas.Estado.indexOf(args) > -1 || quejas.Fecha.indexOf(args) > -1 || quejas.Origen.indexOf(args) > -1){
         resultPosts.push(quejas);
      };
    };
    return resultPosts;
  }

}
