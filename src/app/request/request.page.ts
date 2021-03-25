import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GalleryService } from '../gallery.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  public contactForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,private router: Router, private gallery: GalleryService) { }

  ngOnInit() {
    this.contactForm = this._formBuilder.group({
      id: Math.floor(Math.random() * 50),
      category: "",
      eventType: "",
      message: "",
      address: ""
    });
  }

  onSubmit() {
    this.gallery.addRequest(this.contactForm.value);
    this.router.navigate(['/gallery'])
  }

}
