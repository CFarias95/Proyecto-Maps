import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { finalize, first, switchMap } from 'rxjs/operators';
import { DatosUsuario, User } from '../modelm/user';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private filePath: string;
  public photoURL = null;
  user$: Observable<User>;
  private usuariosCollection: AngularFirestoreCollection<DatosUsuario>;

  constructor(private afAuth: AngularFireAuth, private storage: AngularFireStorage,private afs: AngularFirestore) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`usersmobile/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );

  }

  //registrar usuario
  async registerUser(value, image: string) {
    try{
      const { user } = await this.afAuth.createUserWithEmailAndPassword(value.email,value.password);
      const uid = user.uid;
      const correo = user.email;
      this.filePath = `perfiles/${uid}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
        .pipe(
          finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            console.log(urlImage);
            this.photoURL=urlImage;

            this.afs.collection('usersmobile').doc(uid).set({
              uid : uid,
              correo : correo,
              nombres : value.nombre,
              apellidos : value.apellido,
              foto : this.photoURL,  
            })
          });
        })
      ).subscribe();

      user.updateProfile({
        displayName: value.nombres,
        photoURL: this.photoURL
      });
      
      return user;
    }catch(error){
      console.log(error);
    }
  }

  //logear al usuario
  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
          
    })
    
  } 

  //salir sesion
  logoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }

  //Get user Data
  getUserData(id: string){
    return this.usuariosCollection.doc<DatosUsuario>(id).valueChanges();
  }

  //detalles de usuario
  userDetails() {
    return this.afAuth.user
  }

}
