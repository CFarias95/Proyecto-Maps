import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterp'
})
export class FilterpPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPosts = [];
    for(const promo of value){
      const fecha = new Date(promo.fecha).getTime();
      const fecha1 = new Date(args).getTime();

      if(fecha >= fecha1 ){
        resultPosts.push(promo);
      };
    };
    return resultPosts;
  }

}
