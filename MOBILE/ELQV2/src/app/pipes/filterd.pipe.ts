import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterd'
})
export class FilterdPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPosts = [];
    for(const noticia of value){
      if(noticia.fecha.indexOf(args) > -1 || noticia.fecha >= args ){
         resultPosts.push(noticia);
      };
    };
    return resultPosts;
  }

}
