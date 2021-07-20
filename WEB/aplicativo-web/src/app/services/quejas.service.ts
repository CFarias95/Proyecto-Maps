import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { FileI } from '../modelm/file.interface';
import { Quejas } from '../modelm/quejas';


@Injectable({
  providedIn: 'root'
})
export class QuejasService {
  private quejasCollection: AngularFirestoreCollection<Quejas>;
  private quejas: Observable<Quejas[]>;

  constructor(private db:AngularFirestore) {
    this.quejasCollection = this.db.collection<Quejas>('quejas',ref => ref.orderBy('Fecha', "desc"));
    this.quejas = this.quejasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
   }

  //recuperamos todas las quejas
  getQCS(){
    return this.db.collection('quejas').snapshotChanges();
  }

  //actualizar queja
  updateQCS(documentId: string, data: any){
    return this.quejasCollection.doc(documentId).update(data);
  }

  aprobarQCS(documentId: string){
    return this.quejasCollection.doc(documentId).update({
      Estado: "Aprobado"
    });
  }

  RechazarQCS(documentId: string){
    return this.quejasCollection.doc(documentId).update({
      Estado: "Rechazado"
    });
  }

  //recuperar una queja especifica
  getQCSId(documentId: string){
    return this.quejasCollection.doc(documentId).valueChanges();
  }

}
