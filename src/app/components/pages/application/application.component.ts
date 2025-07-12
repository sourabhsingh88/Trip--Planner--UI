import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { ApplicationService } from "src/app/service/application-service";
import { UserService } from "src/app/service/user-service";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {
  public applicationFormGroup: FormGroup;
  public userResponseList: any = {};
  userId = localStorage.getItem('userId');

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private applicationService: ApplicationService,
    public dialogRef: MatDialogRef<ApplicationComponent>
  ) {
    this.findById();
    this.applicationFormGroup = formBuilder.group({
      userId: new FormControl(this.userId, [Validators.required]),
      experience: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
      bio: new FormControl('', [Validators.required]),
    });
  }

  findById() {
    this.userService.findById(this.userId).subscribe(
      (successResponse) => {
        this.userResponseList = successResponse.data;
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  formatDate(timestamp: number): string {
    if (!timestamp) return '';
    return new Date(timestamp).toISOString().split('T')[0];
  }
applyForTripPlanner() {
  if (!this.applicationFormGroup.valid) return;

  this.applicationService.applyForTripPlanner(this.applicationFormGroup.value).subscribe(
    (successResponse) => {
      alert(successResponse.message);

      const applicationId = successResponse.data?.id; // Check if your API returns ID
      if (applicationId) {
        this.dialogRef.close(); // Close the dialog first
        this.router.navigate(['/application-detail', applicationId], {
          state: { application: successResponse.data }  // optionally pass state
        });
      } else {
        alert("Application submitted, but no ID returned.");
      }
    },
    (errorResponse) => {
      console.log(errorResponse);
      alert(errorResponse.error?.message || 'Something went wrong.');
    }
  );
}


  closeDialog(): void {
    this.dialogRef.close();
  }
}
