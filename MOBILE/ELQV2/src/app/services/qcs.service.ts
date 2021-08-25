import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { finalize, first, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class QcsService {

  constructor() { }
}
