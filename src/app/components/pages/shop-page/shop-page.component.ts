import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { BookingService } from 'src/app/service/booking-service';
import { TripService } from 'src/app/service/trip-service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent {


  filterData = {
    to: '',
    from: '',
    startDuration: null,
    endDuration: null,
    startPrice: null,
    endPrice: null,
    keyword: ''
  };

  durationRanges = [
    { start: 1, end: 3 },
    { start: 4, end: 7 },
    { start: 8, end: 14 },
    { start: 15, end: 30 },
    { start: 31, end: 60 }
  ];

  selectedDurationRange: any = null;

  onDurationRangeChange(selectedRange: any) {
    if (selectedRange) {
      this.filterData.startDuration = selectedRange.start;
      this.filterData.endDuration = selectedRange.end;
    } else {
      this.filterData.startDuration = null;
      this.filterData.endDuration = null;
    }
    this.onFilterChange(); // Trigger API
  }

  priceRanges = [
    { start: 1000, end: 5000 },
    { start: 5001, end: 10000 },
    { start: 10001, end: 20000 },
    { start: 20001, end: 50000 },
    { start: 50001, end: 100000 }
  ];

  selectedPriceRange: any = null;

  onPriceRangeChange(selectedRange: any) {
    if (selectedRange) {
      this.filterData.startPrice = selectedRange.start;
      this.filterData.endPrice = selectedRange.end;
    } else {
      this.filterData.startPrice = null;
      this.filterData.endPrice = null;
    }
    this.onFilterChange(); // trigger the filter update
  }

  page = 0;
  size = 12;
  trips: any[] = [];

  private filterSubject = new Subject<void>();


  isOpen = false;
  selectedOption: string | null = null;
  options = ['Option 1', 'Option 2', 'Option 3'];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
  }
  constructor(private tripService: TripService, private dialog: MatDialog, private bookingService: BookingService, private router: Router) {
    this.filterSubject.pipe(debounceTime(500)).subscribe(() => {
      this.loadFilteredTrips();
    });

  }
  ngOnInit(): void {
    this.loadFilteredTrips(); // ✅ API call on component load
  }
  onFilterChange() {
    this.filterSubject.next(); // triggers the API call after 500ms pause
  }

  totalRecords = 0;
  totalPages = 0;
  totalPagesArray: number[] = [];

  loadFilteredTrips() {
    this.tripService.filterTrips(this.page, this.size, this.filterData).subscribe({
      next: (res: any) => {
        this.trips = res.data;
        this.totalRecords = res.totalRecords;
        this.totalPages = Math.ceil(this.totalRecords / this.size);
        this.totalPagesArray = Array(this.totalPages).fill(0);
      },
      error: err => console.error("Filter Error:", err)
    });
  }

  goToPage(pageIndex: number) {
    this.page = pageIndex;
    this.loadFilteredTrips();
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadFilteredTrips();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadFilteredTrips();
    }
  }


  bookTrip(tripId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmBooking(tripId);
      }
    });
  }
  confirmBooking(tripId: number) {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert("⚠️ Please login first to book this trip.");
      this.router.navigate(['/login']);
      return;
    }

    const payload = {
      userId: +userId,
      tripId: tripId
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
