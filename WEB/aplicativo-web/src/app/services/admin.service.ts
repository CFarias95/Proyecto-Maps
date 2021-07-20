import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs/internal/Observable';
import { finalize, map } from 'rxjs/operators';
import { FileI } from '../modelm/file.interface';
import { DatosUsuario } from '../modelm/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private usuariosCollection: AngularFirestoreCollection<DatosUsuario>;
  private usuarios: Observable<DatosUsuario[]>;
  public photoURL = null;
  private filePath: string;

  constructor(public afAuth: AngularFireAuth, public db:AngularFirestore,private storage: AngularFireStorage) { 

    this.usuariosCollection = this.db.collection<DatosUsuario>('users', ref => ref.orderBy('estado'));
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }
 //recuperar datos del admin
  getAdministrador(id: string){
    return this.usuariosCollection.doc<DatosUsuario>(id).valueChanges();
  }

  //recuperar datos del admin
  getAdministradores(){
    return this.usuariosCollection.valueChanges();
  } 

  //actualizar admin
  updateAdministrador(usuario:DatosUsuario, id: string){
    return this.usuariosCollection.doc(id).update(usuario);
  }

   //habilitar admin
  habilitarAdministrador(id: string){
    return this.usuariosCollection.doc(id).update({
      estado:"Activo"
    });
  }

  deshabilitarAdministrador(id: string){
    return this.usuariosCollection.doc(id).update({
      estado:"Inactivo"
    });
  }

//Actualizar imagen
  updateImagen(usuario:DatosUsuario,id: string,image?: FileI){
    
    //this.afDB.database.ref('users/'+id).set(usuario);
    this.filePath = `perfiles/${id}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            usuario.foto=urlImage;
            this.usuariosCollection.doc(id).update(usuario);
            //this.saveUserProfile(user);
          });
        })
      ).subscribe(); 
  }

  //Cambiar Contraseña
  
//reset password
  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error->', error);
    }
  }
}
