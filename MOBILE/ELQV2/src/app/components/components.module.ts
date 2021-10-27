import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';


@NgModule({
  declarations: [
    NotificacionesComponent
  ],
  exports:[
    NotificacionesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
