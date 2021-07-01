import { Injectable } from '@angular/core';
import { Electrolinera } from '../services/Electrolinera';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database'

@Injectable({
  providedIn: 'root'
})
export class ElectrolineraService {

  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create
  createBooking(apt: Electrolinera){
    return this.bookingListRef.push({
      name: apt.name,
      direccion : apt.direccion,
      imagen: apt.imagen,
      tipoconector: apt.tipoconector,
      numeroconectores: apt.numeroconectores,
      referencia: apt.referencia,
      latitud: apt.latitud,
      longitud: apt.longitud,
      horario:apt.horario,
      formaspago: apt.formaspago
    })
  }

  //Get Single
  getBooking(id: string){
    this.bookingRef = this.db.object('/electrolinera/' + id);
    return this.bookingRef;
  }

  //Get List
  getBookingList(){
    this.bookingListRef = this.db.list('/electrolinera');
    return this.bookingListRef;
  }

  //Update
  updateBooking(id, apt: Electrolinera){
    return this.bookingRef.update({
      name: apt.name,
      direccion : apt.direccion,
      imagen: apt.imagen,
      tipoconector: apt.tipoconector,
      numeroconectores: apt.numeroconectores,
      referencia: apt.referencia,
      latitud: apt.latitud,
      longitud: apt.longitud,
      horario:apt.horario,
      formaspago: apt.formaspago
    })
  }

  //Delete
  deleteBooking(id: string){
    this.bookingRef = this.db.object('/electrolinera/'+ id);
    this.bookingRef.remove();
  }

}