import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-hometwo-banner',
    templateUrl: './hometwo-banner-user.component.html',
    styleUrls: ['./hometwo-banner-user.component.scss']
})
export class HometwoBannerUserComponent implements OnInit {

    constructor() { }
  
    ngOnInit(): void {}


    
    
        slides = [
            {
              image: "../../../../../assets/images/banner-episodes/banner1.png",
             
            },
            {
              image: '../../../../../assets/images/banner-episodes/banner2.jpg',
             
            },
            {
              image: '../../../../../assets/images/banner-episodes/banner3.jpg',
             
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

