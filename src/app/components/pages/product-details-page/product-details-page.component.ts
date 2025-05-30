import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from 'src/app/service/trip-service';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {

  images: string[] = [];          // Array of image URLs from backend
  currentIndex: number = 0;       // Current visible image index

  tripId!: number;
  public tripResponseList: any = {};

  constructor(private route: ActivatedRoute,private tripService: TripService) { }

  ngOnInit(): void {
    // Simulate backend image URLs load (replace with real API call)
    
    this.tripId = +this.route.snapshot.paramMap.get('id')!;
    this.findById(); // Fetch trip details by ID
  }

 prevSlide(): void {
  const banners = this.tripResponseList?.tripBannerResponseModals;
  if (banners && banners.length > 0) {
    this.currentIndex = (this.currentIndex - 1 + banners.length) % banners.length;
  }
}

nextSlide(): void {
  const banners = this.tripResponseList?.tripBannerResponseModals;
  if (banners && banners.length > 0) {
    this.currentIndex = (this.currentIndex + 1) % banners.length;
  }
}

  // Set current image by dot index
  selectImage(index: number): void {
    this.currentIndex = index;
  }

  

  public findById(){
  this.tripService.findById(this.tripId).subscribe(
      (successResponse) =>{
          console.log(successResponse);
          this.tripResponseList = successResponse.data;
      },
      (errorResponse) =>{
          console.log(errorResponse);
      }
  );
}
}
