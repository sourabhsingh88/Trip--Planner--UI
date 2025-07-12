import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApplicationService } from "src/app/service/application-service";

@Component({
  selector: 'app-application',
  templateUrl: './application.detail.component.html',
  styleUrls: ['./application.detail.component.scss']
})
export class ApplicationDetailComponent  {

  public application: any;
  public applicationId!: number;

  constructor(private router: Router,private route: ActivatedRoute,private applicationService: ApplicationService) {
    console.log("ApplicationDetailComponent: Object Created");
    this.applicationId = +this.route.snapshot.paramMap.get('id')!;
    this.findbyId();
  }

  

  public findbyId() {
    this.applicationService.findById(this.applicationId).subscribe(
      (successResponse) => {
        this.application = successResponse.data;
      },
      (errorResponse) => {
        console.error(errorResponse);
        alert(errorResponse.error.message || 'Error fetching application details');
      }
    );
  }


}
