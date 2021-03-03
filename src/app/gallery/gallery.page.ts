import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Gallery } from '../gallery';
import { GalleryService } from '../gallery.service';
import { debounceTime } from "rxjs/operators"
//import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage {

  public searchControl: FormControl;
  public searchTerm: string = "";
  searching: any = false;


  galleryPic: any = [];
  constructor(private prod: GalleryService, private router: Router, public afdm: AngularFireDatabase) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.getGallery();
    // this.setFilteredItems();
    this.setFilteredItems("");

    this.searchControl.valueChanges.pipe(debounceTime(700))
      .subscribe(search => {
        this.setFilteredItems(search);
      });
  }


  getGallery() {

    return this.prod.getAllGallery().subscribe(res => {
      this.galleryPic = res.map(gallery => {
        return {
          ...gallery.payload.doc.data(),
          id: gallery.payload.doc.id
        } as Gallery
      })
    })
  }
  onSearchInput() {
    this.searching = true;
  }
  setFilteredItems(searchTerm) {
    this.galleryPic = this.prod.filterItems(searchTerm);
  }


}
