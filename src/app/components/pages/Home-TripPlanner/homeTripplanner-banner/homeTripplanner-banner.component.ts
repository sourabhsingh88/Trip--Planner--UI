import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-homeTripplanner-banner',
    templateUrl: './homeTripplanner-banner.component.html',
    styleUrls: ['./homeTripplanner-banner.component.scss']
})
export class HomeTripPlannerBannerComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}


    
    
        slides = [ 
            {
              image: '../../../../../assets/images/banner-episodes/download.jpeg',
          
            },
            {
              image: '../../../../../assets/images/banner-episodes/SeaBank.jpeg',
             
            },
            {
              image: '../../../../../assets/images/banner-episodes/SeaBank.jpeg',
             
            },
            {
              image: '../../../../../assets/images/banner-episodes/download.jpeg',
             
            },
            
          ];
        
          customOptions: any = {
            loop: true,
            margin: 10,
            nav: true, // Enable navigation arrows
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            navText: ['❮', '❯'], // Left & Right arrows
            responsive: {
              0: {
                items: 1
              },
              600: {
                items: 1
              },
              1000: {
                items: 1
              }
            }
          };
    }

