import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterep'
})
export class FilterepPipe implements PipeTransform {

  transform(value: any, args: any, args1: any): any {
    const resultPosts = [];
    for(const electrolinera of value){

      if(args && args1){

        if(electrolinera.name.indexOf(args) > -1  && electrolinera.sector.indexOf(args1) > -1){
          resultPosts.push(electrolinera);
        }

      }else if (!args && args1){

        if(electrolinera.sector.indexOf(args1) > -1){
          resultPosts.push(electrolinera);
        }

      }else if(args && !args1){

        if(electrolinera.name.indexOf(args) > -1 || electrolinera.direcion.indexOf(args) > -1){
          resultPosts.push(electrolinera);
        }

      }else if(!args && !args1){
        resultPosts.push(electrolinera);
      }
      // if(!args && args1 && electrolinera.sector.indexOf(args1) > -1){
      //   resultPosts.push(electrolinera);
      // }else if(!args1 && args && electrolinera.name.indexOf(args) > -1 || electrolinera.direcion.indexOf(args) > -1){
      //   resultPosts.push(electrolinera);
      // }
      // else if(args && args1 && electrolinera.name.indexOf(args) > -1  && electrolinera.sector.indexOf(args1) > -1){
      //   resultPosts.push(electrolinera);
      // }
    };
    return resultPosts;
  }

}
