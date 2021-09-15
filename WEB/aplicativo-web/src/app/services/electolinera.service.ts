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


  //Delete
  deleteBooking(id: string){
    this.bookingRef = this.db.object('/electrolinera/'+ id);
    this.bookingRef.remove();
  }

}