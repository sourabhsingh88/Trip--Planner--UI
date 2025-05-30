import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {

  images: string[] = [];          // Array of image URLs from backend
  currentIndex: number = 0;       // Current visible image index

  constructor() { }

  ngOnInit(): void {
    // Simulate backend image URLs load (replace with real API call)
    this.images = [
      'assets/images/product1.jpg',
      'assets/images/product2.jpg',
      'assets/images/product3.jpg',
      'assets/images/product4.jpg',
      'assets/images/product5.jpg',
    ];
  }

  // Show previous image
  prevSlide(): void {
  this.currentIndex = (this.currentIndex === 0) ? this.images.length - 1 : this.currentIndex - 1;
}

nextSlide(): void {
  this.currentIndex = (this.currentIndex === this.images.length - 1) ? 0 : this.currentIndex + 1;
}


  // Set current image by dot index
  selectImage(index: number): void {
    this.currentIndex = index;
  }
}
