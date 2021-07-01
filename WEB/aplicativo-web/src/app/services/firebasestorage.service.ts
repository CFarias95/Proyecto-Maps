import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';
import { FileI } from '../modelm/file.interface';
import { Electrolinera } from '../modelm/electrolinera';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirebasestorageService {
  private filePath: string;
  public photoURL = null;
  private electrolineraCollection: AngularFirestoreCollection<Electrolinera>;
  private electrolineraCollection2: AngularFirestoreCollection<Electrolinera>;
  private Electrolineras: Observable<Electrolinera[]>;

  constructor(

    private firestore: AngularFirestore,  
    private storage: AngularFireStorage) {

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

  // Meotodo para crear un nuevo vehiculo
  public crearAuto(data: {marca: string, modelo:string, anio:number, url: string}) {
    return this.firestore.collection('autos').add(data);
  }
  // Metodo para obtener un auto por ID
  public obtenerAutoId(documentId: string) {
    return this.firestore.collection('autos').doc(documentId).snapshotChanges();
  }
  // Metodo para obtener todos los autos
  public ObtenerAutos() {
    return this.firestore.collection('autos').snapshotChanges();
  }
  // Metodo para actualizar un auto
  public actualizarAuto(documentId: string, data: any) {
    return this.firestore.collection('autos').doc(documentId).set(data);
  }
  // Metodo para eliminar un auto
  public eliminarAuto(documentId: string) {
    return this.firestore.collection('autos').doc(documentId).delete();
  }

  // Meotodo para crear una nueva Electrolinera
  async CrearElectrolinera(
    name: string,
    direccion: string,
    referencia: string,
    tipoconector: string,
    numeroconectores: string,
    lunes: string,
    martes: string,
    miercoles: string,
    jueves: string,
    viernes: string,
    sabado: string,
    domingo: string,
    formaspago: string,
    latitud: string,
    longitud: string,
    estado :string,
    usuario :string,
    image?: FileI,
  ) {
    try{
      this.filePath = `electrolineras/${name}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath,image);
      task.snapshotChanges()
      .pipe(
        finalize(() => {
        fileRef.getDownloadURL().subscribe(urlImage => {
          console.log(urlImage);
          this.photoURL=urlImage;
          this.firestore.collection('electrolineras').add({
            name: name,
            usuario: usuario,
            direccion: direccion,
            referencia: referencia,
            tipoconector: tipoconector,
            numeroconectores: numeroconectores,
            lunes: lunes,
            martes: martes,
            miercoles: miercoles,
            jueves: jueves,
            viernes: viernes,
            sabado: sabado,
            domingo: domingo,
            formaspago: formaspago,
            latitud: latitud,
            longitud: longitud,
            estado : estado,
            imagen: this.photoURL,
          }); 
        });
      })
    ).subscribe();
    
    } catch (error) {
      console.log(error);
    }
    
    //return this.firestore.collection('electrolineras').add(data);
  }

  // Metodo para obtener un auto por ID
  public obtenerElectrolineraId(documentId: string) {
    return this.firestore.collection('electrolineras').doc(documentId).snapshotChanges();
  }

  // Metodo para obtener un auto por ID
  public getElectrolineraId(documentId: string) {
    return this.electrolineraCollection.doc<Electrolinera>(documentId).valueChanges();
  }


  // Metodo para obtener todos los autos
  public ObtenerElectrolineras() {
    return this.firestore.collection('electrolineras').snapshotChanges();
  }

  // Metodo para actualizar un auto
  public actualizarElectrolinera(data: any, documentId: string) {
    return this.firestore.collection('electrolineras').doc(documentId).set(data);
  }
  
  // Metodo para eliminar un auto
  public eliminarElectrolinera(documentId: string) {
    return this.firestore.collection('electrolineras').doc(documentId).delete();
  }

  //Actualizar imagen
  updateImagen(electrolinera:Electrolinera,id: string,image?: FileI){
    
    //this.afDB.database.ref('users/'+id).set(usuario);
    this.filePath = `electrolineras/${electrolinera.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            electrolinera.imagen=urlImage;
            this.electrolineraCollection.doc(id).update(electrolinera);
            //this.saveUserProfile(user);
          });
        })
      ).subscribe();

    
  }


  public BuscarElectrolinera(termino : string){
    this.electrolineraCollection2 = this.firestore.collection<Electrolinera>('electrolineras', ref => ref.where('name', '==', termino));
    this.Electrolineras = this.electrolineraCollection2.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
    return this.Electrolineras;
  }
}
