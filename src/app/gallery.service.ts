import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Request } from './request'

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  galleryItem:any
  userID = localStorage.getItem('userID');
  constructor( private db: AngularFirestore) { }

  getAllGallery(){
    this.galleryItem = this.db.collection("gallery").snapshotChanges();
    return this.galleryItem;
  }

  addRequest(req: Request) {
    let Id = Math.floor(Math.random() * 100);
    this.db.collection("Request").doc(Id.toString()).set({
      // id: this.productLists.length + 1,
      category: req.category,
      eventType: req.eventType,
      address: req.address,
      message: req.message,

    })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  requestService(reqService){
    this.db.collection("Request").add(reqService).then(results => {
      console.log("added == " + results	);
    }
    ).catch(err => {
      console.log(err);
    })
  };


}
