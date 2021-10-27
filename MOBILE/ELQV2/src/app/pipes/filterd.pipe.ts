import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterd'
})
export class FilterdPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPosts = [];
    for(const noticia of value){
      const fecha = new Date(noticia.fecha).getTime();
      const fecha1 = new Date(args).getTime();

      if(fecha >= fecha1 ){
         resultPosts.push(noticia);
      };
    };
    return resultPosts;
  }

}
