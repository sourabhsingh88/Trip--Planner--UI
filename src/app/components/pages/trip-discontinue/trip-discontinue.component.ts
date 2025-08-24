import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TripService } from "src/app/service/trip-service";

@Component({
    selector: 'app-trip-continue',
    templateUrl: './trip-discontinue.component.html',
    styleUrls: ['./trip-discontinue.component.scss']
})
export class TripDiscontinueComponent {

    page = 0;
    size = 12;
    trips: any[] = [];

    constructor(private tripService: TripService, private dialog: MatDialog, private router: Router) {

        console.log("TripDiscontinueComponent: Object Created");


    }
    ngOnInit(): void {
        this.loadFilteredTrips();
    }

    totalRecords = 0;
    totalPages = 0;
    totalPagesArray: number[] = [];
    tripPlannerId: number = Number(localStorage.getItem('tripPlannerId')) || 0;

    loadFilteredTrips() {
        this.tripService.getAllDiscontinuedTrips(this.tripPlannerId, this.page, this.size).subscribe({
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



    }
    toggelStatus(tripId: number) {
        this.tripService.toggleTripStatus(tripId).subscribe({
            next: (res: any) => {
                alert("Trip status updated successfully");
                this.loadFilteredTrips();
            },
            error: (err) => {
                console.error('Status update failed:', err);
                alert("❌ Failed to update trip status. Please try again.");
            }
        });
    }
}