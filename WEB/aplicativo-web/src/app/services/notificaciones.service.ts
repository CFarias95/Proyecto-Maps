import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { FileI } from '../modelm/file.interface';
import { Notificaciones } from '../modelm/notificaciones';


@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  public photoURL = null;
  private filePath: string;
  private notificacionesCollection: AngularFirestoreCollection<Notificaciones>;
  private notificaciones: Observable<Notificaciones[]>;
  ret: any;
  



  constructor(private db:AngularFirestore, private storage: AngularFireStorage,) {

    this.notificacionesCollection = this.db.collection<Notificaciones>('notificaciones',ref => ref.orderBy('fecha', "desc"));
    this.notificaciones = this.notificacionesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

  }

//recuperamos todas las notificaciones
  getNotify(){
    return this.db.collection('notificaciones').snapshotChanges();
  }

//recuperar una notificacion especifica
  getNotifyId(documentId: string){
    return this.notificacionesCollection.doc<Notificaciones>(documentId).valueChanges();
  }

//actualizar notificacion
  updateNotifi(documentId: string, data: any){
    return this.notificacionesCollection.doc(documentId).update(data);
  }


//agregar una notificacion
  addNotify(data, image?: FileI){
    this.filePath = `notificaciones/${data.titulo}`;
    const fileRef = this.storage.ref(this.filePath);
    if(image){
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.photoURL=urlImage;
            //console.log(this.photoURL);
            this.ret =this.db.collection('notificaciones').add({
              titulo: data.titulo,
              texto : data.texto,
              fecha : data.fecha,
              hora: data.hora,
              name: data.name,
              tipo: data.tipo,
              estado : "Activo",
              imagen : this.photoURL
            });
          });
        })
      ).subscribe();
    }else{
      this.ret =this.db.collection('notificaciones').add({
        titulo: data.titulo,
        texto : data.texto,
        fecha : data.fecha,
        hora: data.hora,
        name: data.name,
        tipo: data.tipo,
        estado : "Activo",
        imagen : ""
      });
    }
    
    
    return  

  }

//eliminar Notify
  removeNotify(id: string){
    return this.notificacionesCollection.doc(id).delete();
  }

  //Actualizar imagen
  updateImagen(notify:Notificaciones,id: string,image?: FileI){
    
    //this.afDB.database.ref('users/'+id).set(usuario);
    this.filePath = `electrolineras/${notify.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            notify.imagen=urlImage;
            this.notificacionesCollection.doc(id).update(notify);
            //this.saveUserProfile(user);
          });
        })
      ).subscribe();

    
  }


}
