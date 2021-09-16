import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterp'
})
export class FilterpPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPosts = [];
    for(const promo of value){
      if(promo.fecha.indexOf(args) > -1 || promo.fecha >= args ){
         resultPosts.push(promo);
      };
    };
    return resultPosts;
  }

}
