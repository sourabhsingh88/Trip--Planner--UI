import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CityService } from 'src/app/service/city-service';
import { StateService } from 'src/app/service/state-service';
import { TripService } from 'src/app/service/trip-service';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.scss'],
})
export class TripCreateComponent implements OnInit {
  tripForm: FormGroup;
  selectedImage: File | null = null;
  tripImagePreview: string | ArrayBuffer | null = null;
  bannerPreviews: string[] = [];
  states: any[] = [];
  cities: any[] = [];
  tripplannerId = Number(localStorage.getItem('tripPlannerId') || 0);

  constructor(
    private fb: FormBuilder,
    private stateService: StateService,
    private cityService: CityService,
    private snackBar: MatSnackBar,
    private router: Router,
    private tripService: TripService,
  ) {
    this.tripForm = this.fb.group({
      tripPlannerId: [this.tripplannerId, Validators.required],
      name: ['', Validators.required],
      price: [0, Validators.required],
      duration: [0, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      tourGuideName: ['', Validators.required],
      description: [''],
      state: ['', Validators.required],
      city: ['', Validators.required],
      location: ['', Validators.required],
      accommodations: this.fb.array([]),
      activities: this.fb.array([]),
      meals: this.fb.array([]),
      transports: this.fb.array([]),
      banners: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.findAllStates();

    // Restore from history state if coming from preview
    const state = history.state;
    if (state && state.tripData) {
      this.tripForm.patchValue(state.tripData);
      this.tripImagePreview = state.imagePreview || null;
      this.bannerPreviews = state.bannerPreviews || [];

      this.restoreFormArrays('accommodations', state.tripData.accommodations);
      this.restoreFormArrays('activities', state.tripData.activities);
      this.restoreFormArrays('meals', state.tripData.meals);
      this.restoreFormArrays('transports', state.tripData.transports);
      this.restoreFormArrays('banners', state.tripData.banners);

      // If state is present, trigger city load
      if (state.tripData.state) {
        this.findAllCitiesByStateId(state.tripData.state);
      }
    } else {
      // If not restoring from preview
      this.addAccommodation();
      this.addActivity();
      this.addMeal();
      this.addTransport();
      this.addBanner();
    }
  }

  // ===== GETTERS =====
  get accommodations(): FormArray {
    return this.tripForm.get('accommodations') as FormArray;
  }

  get activities(): FormArray {
    return this.tripForm.get('activities') as FormArray;
  }

  get meals(): FormArray {
    return this.tripForm.get('meals') as FormArray;
  }

  get transports(): FormArray {
    return this.tripForm.get('transports') as FormArray;
  }

  get banners(): FormArray {
    return this.tripForm.get('banners') as FormArray;
  }

  // ===== FORM GROUP ACCESSORS =====
  getAccommodationFormGroup(i: number): FormGroup {
    return this.accommodations.at(i) as FormGroup;
  }

  getActivityFormGroup(i: number): FormGroup {
    return this.activities.at(i) as FormGroup;
  }

  getMealFormGroup(i: number): FormGroup {
    return this.meals.at(i) as FormGroup;
  }

  getTransportFormGroup(i: number): FormGroup {
    return this.transports.at(i) as FormGroup;
  }

  getBannerFormGroup(i: number): FormGroup {
    return this.banners.at(i) as FormGroup;
  }

  // ===== RESTORE METHOD FOR FORMS =====
  restoreFormArrays(arrayName: string, data: any[]) {
    const formArray = this.tripForm.get(arrayName) as FormArray;
    formArray.clear();
    if (data && data.length) {
      data.forEach((item, index) => {
        if (arrayName === 'accommodations') {
          formArray.push(this.fb.group({
            name: [item.name || ''],
            email: [item.email || ''],
            phoneNumber: [item.phoneNumber || ''],
            capacity: [item.capacity || 0],
            type: [item.type || ''],
            description: [item.description || '']
          }));
        } else if (arrayName === 'activities') {
          formArray.push(this.fb.group({
            name: [item.name || ''],
            activityDate: [item.activityDate || ''],
            description: [item.description || '']
          }));
        } else if (arrayName === 'meals') {
          formArray.push(this.fb.group({
            name: [item.name || ''],
            description: [item.description || '']
          }));
        } else if (arrayName === 'transports') {
          formArray.push(this.fb.group({
            name: [item.name || ''],
            description: [item.description || '']
          }));
        } else if (arrayName === 'banners') {
          formArray.push(this.fb.group({
            file: [item.file || null]
          }));
        }
      });
    }
  }

  // ===== SECTION OPERATIONS =====
  addAccommodation() {
    this.accommodations.push(this.fb.group({
      name: [''],
      email: [''],
      phoneNumber: [''],
      capacity: [0],
      type: [''],
      description: ['']
    }));
  }

  addActivity() {
    this.activities.push(this.fb.group({
      name: [''],
      activityDate: [''],
      description: ['']
    }));
  }

  addMeal() {
    this.meals.push(this.fb.group({
      name: [''],
      description: ['']
    }));
  }

  addTransport() {
    this.transports.push(this.fb.group({
      name: [''],
      description: ['']
    }));
  }

  addBanner() {
    this.banners.push(this.fb.group({
      file: [null, Validators.required]
    }));
  }

  removeAccommodation(i: number) { this.accommodations.removeAt(i); }
  removeActivity(i: number) { this.activities.removeAt(i); }
  removeMeal(i: number) { this.meals.removeAt(i); }
  removeTransport(i: number) { this.transports.removeAt(i); }
  removeBanner(i: number) { this.banners.removeAt(i); }

  // ===== PREVIEW IMAGE HANDLING =====
  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = () => this.tripImagePreview = reader.result;
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onBannerFileChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.banners.at(index).get('file')?.setValue(file);
      const reader = new FileReader();
      reader.onload = () => this.bannerPreviews[index] = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  // ===== FORM SUBMIT =====
  submitTrip() {
    if (this.tripForm.invalid) {
      this.snackBar.open('❌ Please fill all required fields.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    const formData = new FormData();
    formData.append('tripData', JSON.stringify(this.tripForm.value));
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.banners.controls.forEach((ctrl, index) => {
      const file = ctrl.get('file')?.value;
      if (file) {
        formData.append('banners', file);
      }
    });

    const cleanTripData = { ...this.tripForm.value };
    delete cleanTripData.banners; // ❌ Remove banner files from JSON

    this.tripService.selectedImage = this.selectedImage;
    this.tripService.bannerFiles = this.banners.controls
      .map(c => c.get('file')?.value)
      .filter((file): file is File => file instanceof File);

    this.router.navigate(['/trip-preview'], {
      state: {
        tripData: cleanTripData,
        imagePreview: this.tripImagePreview,
        bannerPreviews: this.bannerPreviews
      }
    });


  }

  // ===== STATE / CITY APIs =====
  findAllStates() {
    this.stateService.findAll().subscribe({
      next: res => this.states = res.data,
      error: err => console.error('❌ Error loading states:', err)
    });
  }

  findAllCitiesByStateId(stateId: number) {
    this.cityService.findAllByStateId(stateId).subscribe({
      next: res => this.cities = res.data,
      error: err => console.error('❌ Error loading cities:', err)
    });
  }

  onStateChange(stateId: number) {
    this.findAllCitiesByStateId(stateId);
  }
}
