import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { finalize, first, map, switchMap } from 'rxjs/operators';
import { Notificaciones } from '../modelm/notificaciones';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class QcsService {

  private qcsCollection: AngularFirestoreCollection<Notificaciones>;
  private qcsCollection2: AngularFirestoreCollection<Notificaciones>;
  private Qcs: Observable<any>;
  private Qcs2: Observable<Notificaciones[]>;
  fecha :Date;
  constructor( 
    private firestore: AngularFirestore, 
    private afAuth: AngularFireAuth ) { }

  public getMisQCS(id:String){
   
    this.qcsCollection = this.firestore.collection<Notificaciones>('quejas', ref => ref.where('IdUser', '==', id ));
    this.Qcs = this.qcsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );

    return this.Qcs;
  }

  public getMisQCSCreadas(id:String){
   
    this.qcsCollection = this.firestore.collection<Notificaciones>('quejas', ref => ref.where('IdUser', '==', id ).where('Estado','==','Creado'));
    this.Qcs = this.qcsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );

    return this.Qcs;
  }

  public getMisQCSRechazadas(id:String){
   
    this.qcsCollection = this.firestore.collection<Notificaciones>('quejas', ref => ref.where('IdUser', '==', id ).where('Estado','==','Rechazado'));
    this.Qcs = this.qcsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );

    return this.Qcs;
  }

  public getMisQCSAprobadas(id:String){
   
    this.qcsCollection = this.firestore.collection<Notificaciones>('quejas', ref => ref.where('IdUser', '==', id ).where('Estado','==','Aprobado'));
    this.Qcs = this.qcsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );

    return this.Qcs;
  }

  userDetails() {
    return this.afAuth.user
  }

  public crearQcs(value, user: String, Id : String){
    this.fecha = new Date();
    return this.firestore.collection('quejas').add({
      Estado: "Creado",
      Fecha: this.fecha.toISOString(),
      IdUser : Id,
      Notify: null,
      Origen: value.origen,
      Razon: null,
      Texto: value.texto,
      Tipo: value.tipo,
      User: user
    }); 
  }

}
