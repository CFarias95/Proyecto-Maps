import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtercr'
})
export class FiltercrPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPosts = [];
    for(const quejas of value){
      if(quejas.Origen.indexOf(args) > -1 || quejas.Texto.indexOf(args) > -1 ){
         resultPosts.push(quejas);
      };
    };
    return resultPosts;
  }

}
