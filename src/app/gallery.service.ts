import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  galleryItem:any

  constructor( private db: AngularFirestore) { }

  getAllGallery(){
    this.galleryItem = this.db.collection("gallery").snapshotChanges();
    return this.galleryItem;
  }

  filterItems(searchTerm) {
    this.galleryItem = this.db.collection("gallery").snapshotChanges();
    return this.galleryItem.filter(item => {
      return item.category.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
