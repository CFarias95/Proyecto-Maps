import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notificaciones } from '../modelm/notificaciones';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  private notifyCollection: AngularFirestoreCollection<Notificaciones>;
  private notifyCollection2: AngularFirestoreCollection<Notificaciones>;
  private Notify: Observable<any>;
  private Notify2: Observable<Notificaciones[]>;

  constructor(private firestore: AngularFirestore) { }

  public getNoticias(){
   
    this.notifyCollection = this.firestore.collection<Notificaciones>('notificaciones', ref => ref.where('tipo', '==', 'Noticia'));
    this.Notify = this.notifyCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );

    return this.Notify;
  }

}
