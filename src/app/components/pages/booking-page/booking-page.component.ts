import { Component, HostListener, OnInit } from '@angular/core';
import { BookingService } from 'src/app/service/booking-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss']
})
export class BookingPageComponent implements OnInit {
  bookings: any[] = [];
  page = 0;
  size = 5;
  totalPages = 0;

  isLoading = false;
  role = localStorage.getItem('role');
  userId = localStorage.getItem('userId');
  tripPlannerId = localStorage.getItem('tripPlannerId');

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  // ✅ Lazy Loading: Load more bookings
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight + 100 >= documentHeight && !this.isLoading && this.page < this.totalPages - 1) {
      this.page++;
      this.loadBookings();
    }
  }

  // ✅ Load Bookings Based on Role
  loadBookings() {
    if (this.isLoading) return;

    this.isLoading = true;
    const fetchFn = this.role === 'customer'
      ? this.bookingService.findByUserId(+this.userId!, this.page, this.size)
      : this.bookingService.findByTripPlannerId(+this.tripPlannerId!, this.page, this.size);

    fetchFn.subscribe({
      next: (res) => {
        this.bookings.push(...res.data);
        this.totalPages = Math.ceil(res.totalRecords / this.size);
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error loading bookings:", err);
        this.isLoading = false;
      }
    });
  }

  // ✅ Update Booking Status
  changeStatus(bookingId: number, newStatusId: number) {
    const payload = {
      id: bookingId,
      statusId: newStatusId
    };
    this.bookingService.updateBookingStatus(payload).subscribe(() => {
      alert('✅ Status updated!');
      this.page = 0;
      this.bookings = [];
      this.loadBookings();
    });
  }

  // ✅ Get Step Flow Based on Booking Status
  getStatusSteps(statusName: string) {
    const baseSteps = [
      { code: 11, name: 'Request Sent' },
      { code: 12, name: 'Response Received' },
      { code: 13, name: 'Payment Pending' }
    ];

    if (statusName === 'Rejected') {
      baseSteps.push({ code: 15, name: 'Rejected' });
    } else {
      baseSteps.push({ code: 14, name: 'Confirmed' });
    }

    return baseSteps;
  }

  getStatusCode(statusName: string): number {
    const statusMap: any = {
      'Request Sent': 11,
      'Response Received': 12,
      'Payment Pending': 13,
      'Confirmed': 14,
      'Rejected': 15
    };
    return statusMap[statusName] || 0;
  }

  isConfirmedStep(code: number, currentStatus: string): boolean {
    return this.getStatusCode(currentStatus) === 14 && code === 14;
  }

  isRejectedStep(code: number, currentStatus: string): boolean {
    return this.getStatusCode(currentStatus) === 15 && code === 15;
  }

  isFinalStep(code: number): boolean {
    return code === 14 || code === 15;
  }
  isPrevDone(statusName: string, index: number): boolean {
  const steps = this.getStatusSteps(statusName);
  if (index <= 0 || !steps || !steps[index - 1]) return false;
  return this.getStatusCode(statusName) > steps[index - 1].code;
}


}
