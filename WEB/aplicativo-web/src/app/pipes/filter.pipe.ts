import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPosts = [];
    for(const usuario of value){
      if(usuario.nombres.indexOf(args) > -1 || usuario.estado.indexOf(args) > -1){
         resultPosts.push(usuario);
      };
    };
    return resultPosts;
  }


}
