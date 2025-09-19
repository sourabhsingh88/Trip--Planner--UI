import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CityService } from 'src/app/service/city-service';
import { StateService } from 'src/app/service/state-service';
import { UserService } from 'src/app/service/user-service';

@Component({
    selector: 'app-profile-update',
    templateUrl: './profile.update.component.html',
    styleUrls: ['./profile.update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {
    profileForm!: FormGroup;
    selectedImageFile!: File;
    imagePreviewUrl: string | ArrayBuffer | null = null;
    public userData: any;

    public states: any[] = [];
    public cities: any[] = [];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private stateService: StateService,
        private cityService: CityService,
        private snackBar: MatSnackBar,
        private userService: UserService,
    ) {
        const nav = this.router.getCurrentNavigation();
        this.userData = nav?.extras?.state?.['user'];
        console.log('GENDER FROM USERDATA:', this.userData.gender);

    }

    ngOnInit(): void {
        this.profileForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', Validators.required],
            dob: ['', Validators.required],
            gender: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required],
            location: ['', Validators.required],
            profilePhoto: [null]
        });

        this.findAllStates();

        if (this.userData) {
            this.profileForm.patchValue({
                name: this.userData.name,
                email: this.userData.email,
                phoneNumber: this.userData.phoneNumber,
                dob: new Date(this.userData.dob),
                gender: this.userData.gender,
                location: this.userData.locationName,
                state: this.userData.sateId,   // ⚠️ spelling must match your API field
                city: this.userData.cityId
            });

            this.imagePreviewUrl = `http://localhost:1002/booking-service-api-local/user/${this.userData.profileImage}`;

            // ⚠️ Load cities for saved state
            this.findAllCitiesByStateId(this.userData.sateId);
        }
    }

    // 🔁 API Call: Get All States
    public findAllStates() {
        this.stateService.findAll().subscribe(
            (response) => {
                this.states = response.data;
                console.log("✅ States loaded:", this.states);
            },
            (error) => {
                console.error("❌ Error loading states:", error);
            }
        );
    }

    // 🔁 API Call: Get Cities by State ID
    public findAllCitiesByStateId(stateId: number) {
        this.cityService.findAllByStateId(stateId).subscribe(
            (response) => {
                
                this.cities = response.data;
                console.log("✅ Cities loaded for state:", stateId, this.cities);
            },
            (error) => {
                console.error("❌ Error loading cities:", error);
            }
        );
    }

    // 🧠 Triggered on State change from dropdown
    onStateChange(stateId: number) {
        this.cityService.findAllByStateId(stateId).subscribe(
            (response) => {
                this.cities = response.data;
                this.profileForm.patchValue({ city: null }); // reset city


                if (!this.cities || this.cities.length === 0) {
                    const snackRef = this.snackBar.open('⚠️ No cities found for the selected state.', 'Close', {
                        duration: 5000,
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        panelClass: ['snackbar-warning']
                    });

                    // ✅ Manually dismiss if user clicks close
                    snackRef.onAction().subscribe(() => {
                        snackRef.dismiss();
                    });
                }
            },
            (error) => {
                const snackRef = this.snackBar.open(error.error?.message || 'Error fetching cities', 'Close', {
                    duration: 5000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['snackbar-error']
                });

                // ✅ Dismiss on close
                snackRef.onAction().subscribe(() => {
                    snackRef.dismiss();
                });
            }
        );
    }



    // 📸 Image file input logic
    triggerFileInput() {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) fileInput.click();
    }

    onImageSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedImageFile = file;
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreviewUrl = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }

    // 📤 Submit form
    onSubmit(): void {
        if (!this.profileForm.valid) return;

        const formValue = this.profileForm.value;

        const userJson = {
            id: this.userData.id,
            name: formValue.name,
            email: formValue.email,
            phoneNumber: formValue.phoneNumber,
            gender: formValue.gender,
            dob: formValue.dob,
            locationName: formValue.location,
            cityId: formValue.city
        };

        console.log("📤 User JSON to update:", userJson);
        const formData = new FormData();
        if (this.selectedImageFile) {
            formData.append('profilePhoto', this.selectedImageFile);
        }

        this.userService.updateUserWithPhoto(formData, userJson).subscribe(
            (res) => {
                this.userService.saveUserData(res .data);
                this.userService.updateLocalUserPhoto(res.data.profileImage);

                this.snackBar.open('🎉 Profile updated successfully!', 'Close', {
                    duration: 4000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['snackbar-success']
                });
                this.router.navigate(['/profile']);
            },
            (err) => {
                this.snackBar.open('❌ Failed to update profile. Please try again.', 'Close', {
                    duration: 4000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['snackbar-error']
                });
            }
        );

    }
}
