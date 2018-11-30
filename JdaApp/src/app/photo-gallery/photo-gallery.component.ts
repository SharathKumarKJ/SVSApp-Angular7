import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor() { }

  ngOnInit(): void {

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
       
        width: '80%',
        height: '500px',
        imagePercent: 90,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: true
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/1-small.jpeg',
        medium: 'assets/1-medium.jpeg',
        big: 'assets/1-medium.jpeg'
      },
      {
        small: 'assets/2-small.jpeg',
        medium: 'assets/2-medium.jpeg',
        big: 'assets/2-medium.jpeg'
      },
      {
        small: 'assets/3-small.jpeg',
        medium: 'assets/3-medium.jpeg',
        big: 'assets/3-medium.jpeg'
      },
      {
        small: 'assets/4-small.jpeg',
        medium: 'assets/4-medium.jpeg',
        big: 'assets/4-medium.jpeg'
      },
      {
        small: 'assets/5-small.jpeg',
        medium: 'assets/5-medium.jpeg',
        big: 'assets/5-medium.jpeg'
      },
      {
        small: 'assets/6-small.jpeg',
        medium: 'assets/6-medium.jpeg',
        big: 'assets/6-medium.jpeg'
      },
      {
        small: 'assets/7-small.jpeg',
        medium: 'assets/7-medium.jpeg',
        big: 'assets/7-medium.jpeg'
      }
    ];
  }
}


