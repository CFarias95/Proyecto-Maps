import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { finalize, first, isEmpty, map, switchMap } from 'rxjs/operators';
import { DatosUsuario, User } from '../modelm/user';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FileI } from '../modelm/file.interface';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import  firebase from 'firebase';
import { AlertController, NavController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private filePath: string;
  public photoURL = null;
  user$: Observable<User>;
  private usuariosCollection: AngularFirestoreCollection<DatosUsuario>;
  private Usuario: Observable<any>;
  public loading: any;
  constructor(
    private afAuth: AngularFireAuth, 
    private storage: AngularFireStorage,
    private afs: AngularFirestore, 
    private google : GooglePlus,
    private nativeStorage: NativeStorage,
    public alertController: AlertController,
    private navCtrl: NavController) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`usersmobile/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );

    this.usuariosCollection=this.afs.collection<DatosUsuario>('usersmobile');
    this.Usuario=this.usuariosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
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
      
      user.sendEmailVerification();

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
          res => {if (res.user.emailVerified){
            resolve(res);
            this.nativeStorage.setItem('Estado','Logeado');
          }},
          err => {reject(err),this.nativeStorage.setItem('Estado','NO');})
        
          
    })
    
  } 

  //salir sesion
  async  logoutUser() {
    const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirmar!',
        message: '<strong>Seguro que quieres salir</strong>!!!',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Si',
            handler: () => {
              return new Promise<void>((resolve, reject) => {
                if (this.afAuth.currentUser) {
                  this.afAuth.signOut()
                    .then(() => {
                      console.log("Log OUT");
                      this.nativeStorage.setItem('Estado','NO').then(res=>{
                        resolve();
                        this.navCtrl.navigateBack('/login');
                      },err=>{
                        console.log(err);
                      }              
                      );           
                    }).catch((error) => {
                      reject();
                    });
                }
              })
            }
          }
        ]
      });
  
      await alert.present();
    }

  //Get user Data
  getUserData(id: string){
    //return  this.afs.collection('usersmobile').doc(id).valueChanges();
    return this.usuariosCollection.doc<DatosUsuario>(id).valueChanges();
  }

  //Update user Data
  updateUser(id: string, value){
    return this.usuariosCollection.doc<DatosUsuario>(id).update({
      nombres: value.nombre,
      apellidos: value.apellido
    })
  }

  //Update imagen
  updateImagen(usuario:DatosUsuario, id: string,image?: FileI){
    
    //this.afDB.database.ref('users/'+id).set(usuario);
    this.filePath = `usermobile/${id}`;
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

  //detalles de usuario
  userDetails() {
    return this.afAuth.user
  }

  googleLogin(){

    return this.google.login({}).then(res => {
      const userdataGoogle = res;
      //alert ( "Resultado del login: "+JSON.stringify(res));
      console.log("USERDATA: "+ JSON.stringify(userdataGoogle));

      return new Promise<any>((resolve, reject) => {
        this.afAuth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(null,userdataGoogle.accessToken ))
          .then(
            res => {
              this.nativeStorage.setItem('Estado','Logeado');
              resolve(res);
              console.log("USER UID: "+res.user.uid);
              if(userdataGoogle.imageUrl == ""){
                this.photoURL = userdataGoogle.imageUrl;
                this.afs.collection('usersmobile').doc(res.user.uid).set({
                  uid : res.user.uid,
                  correo : userdataGoogle.email,
                  nombres : userdataGoogle.givenName,
                  apellidos : userdataGoogle.familyName,
                  foto : this.photoURL,  
                });
              }else{
                this.photoURL = "";
                this.afs.collection('usersmobile').doc(res.user.uid).set({
                  uid : res.user.uid,
                  correo : userdataGoogle.email,
                  nombres : userdataGoogle.givenName,
                  apellidos : userdataGoogle.familyName,
                });
              }
              
            },
            err => {reject(err); this.nativeStorage.setItem('Estado','NO');})
            })

    })

    this.loading.dismiss();
  }

  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      //this.updateUserData(user);
      return user;
    } catch (error) {
      alert('Error->'+ JSON.stringify(error))
      console.log('Error->', JSON.stringify(error));
    }
  }



}


