import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtern'
})
export class FilternPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPosts = [];
    for(const notificaciones of value){
      if(notificaciones.name.indexOf(args) > -1 || notificaciones.titulo.indexOf(args) > -1 || notificaciones.fecha.indexOf(args) > -1){
         resultPosts.push(notificaciones);
      };
    };
    return resultPosts;
  }


}
