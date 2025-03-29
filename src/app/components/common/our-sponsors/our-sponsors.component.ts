import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
    selector: 'app-our-sponsors',
    templateUrl: './our-sponsors.component.html',
    styleUrls: ['./our-sponsors.component.scss']
})
export class OurSponsorsComponent implements OnInit {

    constructor(
        public router: Router
	) { }

    ngOnInit(): void {
    }

    sponsorsSlides: OwlOptions = {
		margin: 25,
        loop: true,
		nav: false,
		dots: false,
		autoplay: true,
		smartSpeed: 500,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 2
			},
			576: {
				items: 3
			},
			768: {
				items: 5
			},
			1024: {
				items: 5
			},
			1200: {
				items: 8
			}
		}
    }

}