import { Component, OnInit } from '@angular/core';
import { AboutUsService } from 'src/app/service/aboutUs-service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent {

  constructor(private aboutUsService: AboutUsService) {
    console.log("AboutPageComponent : Object Created");
    this.getAboutUs();
  }

  public aboutUs: any;
  public aboutUsId: number = 1;


  public getAboutUs() {


    this.aboutUsService.findById(this.aboutUsId).subscribe(
      (successResponse) => {
        console.log(successResponse);
        this.aboutUs = successResponse.data;
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }
}