import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _afs: AngularFirestore) { }

  getMessages(){
    return this._afs
      .collection<any>('messages')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(doc => {
            return doc.payload.doc.data()
          })
        })
      )
  }

  addMessage(email: string, content: string){
    this._afs.collection<any>('messages').add({
      email: email,
      content: content,
      createdAt: Date.now()
    })
  }
}
