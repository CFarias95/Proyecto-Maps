import { Injectable } from '@angular/core';
import { DatosUsuario, User } from '../modelm/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, map, switchMap } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileI } from '../modelm/file.interface';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { TooltipComponent } from '@angular/material/tooltip';


@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {
  
  private filePath: string;
  public photoURL = null;
  user$: Observable<User>;
  errores=null;
  private usuariosCollection: AngularFirestoreCollection<DatosUsuario>;
  private usuario: Observable<DatosUsuario[]>;
  userData: any;

  constructor(
    private afAuth: AngularFireAuth, 
    private afAuthUser: AngularFireAuth, 
    private storage: AngularFireStorage, 
    private afs: AngularFirestore,) { 

    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );

    this.usuariosCollection = afs.collection<DatosUsuario>('users');
    this.usuario = this.usuariosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
    
  }

  obtenerusuario(){
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
   }

  //metodo para login//
  async login(email: string, password: string) 
  {
    
    try {
        const { user } = await this.afAuth.signInWithEmailAndPassword(
          email,
          password
        );
        if(user.emailVerified){

        
          if (user) {
            this.userData = user;
            localStorage.setItem('user', JSON.stringify(this.userData));
            JSON.parse(localStorage.getItem('user'));
          } else {
            localStorage.setItem('user', null);
            JSON.parse(localStorage.getItem('user'));
          }
          return user;

          // this.usuariosCollection.doc(user.uid).valueChanges().subscribe(res => {
          //   if(res.estado == 'Activo'){
          //     console.log("Usuario Activo");
          //     console.log(user);
          //     return user;

          //   }else{
          //     console.log("Usuario Inactivo");
          //   }
          //  });
        }else{
          user.sendEmailVerification();
        }
      //return user;
    } catch (error) {
      console.log(error);
    }
  }

  //metodo para registrar un usuario//
  async register(email: string, password: string, nombres: string, apellidos: string, direccion : string ,telefono: string,tipo:string, image?: FileI) 
  {
    try {

        const { user } = await this.afAuthUser.createUserWithEmailAndPassword(email,password);
        const uid = user.uid;
        const correo = user.email;
        this.filePath = `perfiles/${uid}`;
        const fileRef = this.storage.ref(this.filePath);
        if(image){
          const task = this.storage.upload(this.filePath, image);
          task.snapshotChanges()
          .pipe(
            finalize(() => {
            fileRef.getDownloadURL().subscribe(urlImage => {
              console.log(urlImage);
              this.photoURL=urlImage;
              this.afs.collection('users').doc(uid).set({
                uid : uid,
                correo : correo,
                nombres : nombres,
                apellidos : apellidos,
                direccion: direccion,
                telefono : telefono,
                tipo: tipo,
                estado : "Activo",
                foto : this.photoURL,  
                })
              });
            })
          );
        }else{

          this.afs.collection('users').doc(uid).set({
            uid : uid,
            correo : correo,
            nombres : nombres,
            apellidos : apellidos,
            direccion: direccion,
            telefono : telefono,
            tipo: tipo,
            estado : "Activo",
            foto : "",  
            })

        }

        user.updateProfile({
          displayName: nombres,
          photoURL: this.photoURL
        });
        
        user.sendEmailVerification();
        this.afAuthUser.signOut();
        //(await this.afAuthUser.currentUser).delete();
        return user;
      
    } catch (error) {
      console.log(error);
      this.errores = error;
      return false;
    }

  }
  
  //metodo pasa salir//
  async logout() {
    try {
      localStorage.removeItem('user');
      this.afAuth.signOut();
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }

  //obtener el usuario actual//
  getCurrentUser() {

    const user = JSON.parse(localStorage.getItem('user'));
    return user;
      
  }

  async cambiarContraseña(password :string){
    await (await this.afAuth.currentUser).updatePassword(password);
  }

  //validar correo
  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }
  
 //recuperamos los datos del usuario
  getUsuario(id: string){
    return this.usuariosCollection.doc<DatosUsuario>(id).valueChanges();
  }

  //actualizar usuario
  updateUsuario(usuario:DatosUsuario, id: string){
  
    return this.usuariosCollection.doc(id).update(usuario);
    
  }

  updateElectroUsuario(electro:string, id: string){
  
    return this.usuariosCollection.doc(id).update({
      electrolinera: electro
    });
    
  }
}
