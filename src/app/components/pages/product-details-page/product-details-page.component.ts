import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/service/booking-service';
import { TripService } from 'src/app/service/trip-service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

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

  constructor(private route: ActivatedRoute,
    private tripService: TripService, 
    private bookingService: BookingService,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog) { }

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

bookTrip() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
         this.confirmBooking();
      }
    });
   }
  confirmBooking() {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert("⚠️ Please login first to book this trip.");
      this.router.navigate(['/login']);
      return;
    }

    const payload = {
      userId: +userId,
      tripId: this.tripResponseList.id
    };

    this.bookingService.createBooking(payload)
      .subscribe({
        next: (res: any) => {
          alert("🎉 Request Sent For Booking Trip");
          // this.router.navigate(['/bookings']);
        },
        error: (err) => {
          console.error('Request failed:', err);
          alert("❌ Booking failed. Please try again.");
        }
      });
  }
   
  }