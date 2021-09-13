import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { finalize, first, map, switchMap } from 'rxjs/operators';
import { Electrolinera, ElectrolineraUbicacion } from '../modelm/electrolinera';
@Injectable({
  providedIn: 'root'
})
export class ElectrolinerasService {

  private filePath: string;
  public photoURL = null;
  private electrolineraCollection: AngularFirestoreCollection<Electrolinera>;
  private electrolineraCollection2: AngularFirestoreCollection<ElectrolineraUbicacion>;
  private Electrolineras: Observable<any>;
  private Electrolineras2: Observable<ElectrolineraUbicacion[]>;
  
  constructor(
    private firestore: AngularFirestore,  
    private storage: AngularFireStorage
  ) { 
    
    this.electrolineraCollection=this.firestore.collection<Electrolinera>('electrolineras');
    this.Electrolineras=this.electrolineraCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
  }

   // Metodo para Electrolinera  por ID
  public getElectrolineraId(documentId: string) {
    return this.electrolineraCollection.doc<Electrolinera>(documentId).valueChanges();
  }


  // Metodo para obtener todaslas electrolineras
  public ObtenerElectrolineras() {
    return this.firestore.collection('electrolineras').snapshotChanges();
  }

  public getElectrolinerasActivas(userid : string){
   
    this.electrolineraCollection2 = this.firestore.collection<Electrolinera>('electrolineras', ref => ref.where('estado', '==', 'Activo'));
    this.Electrolineras = this.electrolineraCollection2.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return id;
        });
      })
    );

    return this.Electrolineras;
  }

  public getElectrolinerasUbicaciones(){
   
    this.electrolineraCollection2=this.firestore.collection<Electrolinera>('electrolineras');
    this.Electrolineras2=this.electrolineraCollection2.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
    return  this.Electrolineras2
  }
}
