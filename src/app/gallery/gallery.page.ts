import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Gallery } from '../gallery';
import { GalleryService } from '../gallery.service';
import * as _ from 'lodash'

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  public searchControl: FormControl;
  public searchTerm: string = "";
  searching: any = false;


  galleryPic: any = [];

  category:any =[];
  filters ={};

  filteredCategory:any = [];

  constructor(private prod: GalleryService, private router: Router, public db: AngularFireDatabase) {}

  ngOnInit() {

    // this.db.list('/gallery').snapshotChanges().subscribe(category =>{
    //   this.category = category;
    //   this.applyFilters();
    // })

    this.getGallery();

  }

  // private applyFilters(){
  //   this.filteredCategory = _.filter( this.category, _.conforms(this.filters))
  // }
  // filterExact(property: string, rule:any){
  //   this.filters[property] = val => val == rule;
  //   this.applyFilters()
  // }

  // filterBoolean(property:string, rule:boolean){
  //   if (!rule){
  //     this.removeFilter(property)
  //   }else{
  //     this.filters[property] = val => val
  //     this.applyFilters();
  //   }
  // }

  // removeFilter(property: string){
  //   delete this.filters[property]
  //   this[property] = null
  //   this.applyFilters()
  // }

  getGallery() {

    return this.prod.getAllGallery().subscribe(res => {
      this.category = res.map(gallery => {
        return {
          ...gallery.payload.doc.data(),
          id: gallery.payload.doc.id,
          
        } as Gallery
        
      })
    })
  }
  // ViewCategory(category) {
  //   this.router.navigateByUrl('/welcome', { state: category });
  // }

}
