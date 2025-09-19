import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from 'src/app/service/trip-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trip-preview',
  templateUrl: './trip-preview.component.html',
  styleUrls: ['./trip-preview.component.scss']
})
export class TripPreviewComponent implements OnInit, OnDestroy {
  tripData: any;
  imagePreview: string | ArrayBuffer | null = null;
  bannerPreviews: string[] = [];

  selectedImage: File | null = null;
  bannerFiles: File[] = [];

  constructor(
    private tripService: TripService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state || history.state;

    this.tripData = state?.tripData || null;
    this.imagePreview = state?.imagePreview || null;
    this.bannerPreviews = state?.bannerPreviews || [];

    this.selectedImage = state?.selectedImage || this.tripService.selectedImage;
    this.bannerFiles = state?.bannerFiles || this.tripService.bannerFiles || [];
  }

  ngOnInit(): void {
    window.addEventListener('beforeunload', this.preventReloadLoss);
  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this.preventReloadLoss);
  }

  preventReloadLoss(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = '';
  }

  submitToApi(): void {
    const validBanners = (this.bannerFiles || []).filter(file => file instanceof File);

    if (!this.selectedImage || validBanners.length === 0) {
      this.snackBar.open("❌ Missing required images. Please go back and re-upload.", "Close", {
        duration: 4000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    const transformedTrip = {
      tripplannerId: this.tripData.tripPlannerId,
      name: this.tripData.name,
      to: this.tripData.to,
      from: this.tripData.from,
      duration: this.tripData.duration,
      prrice: this.tripData.price, // backend field spelling
      tourGuideName: this.tripData.tourGuideName,
      startDate: this.tripData.startDate,
      endDtate: this.tripData.endDate, // backend field spelling
      description: this.tripData.description,
      locationName: this.tripData.location,
      cityId: this.tripData.city,
      accommodationCreateRequestModals: this.tripData.accommodations,
      activityCreateRequestModals: this.tripData.activities,
      mealCreateRequestModals: this.tripData.meals,
      transportCreateRequestModals: this.tripData.transports
    };

    const tripJson = JSON.stringify(transformedTrip);

    this.tripService.createTrip(tripJson, this.selectedImage, validBanners).subscribe({
      next: () => {
        alert('✅ Trip created successfully!');
        this.router.navigate(['/tripplanner-dashboard']);
      },
      error: (err) => {
        alert('❌ Failed to create trip: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  goBackToEdit(): void {
    this.router.navigate(['/trip-create'], {
      state: {
        tripData: this.tripData,
        imagePreview: this.imagePreview,
        bannerPreviews: this.bannerPreviews,
        selectedImage: this.selectedImage,
        bannerFiles: this.bannerFiles
      }
    });
  }
}
