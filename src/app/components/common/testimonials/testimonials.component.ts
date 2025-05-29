import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
    selector: 'app-testimonials',
    templateUrl: './testimonials.component.html',
    styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

    constructor(
		public router: Router
    ) { }

    ngOnInit(): void {
    }

    testimonialsSlides: OwlOptions = {
		items: 1,
		loop: true,
		nav: false,
		dots: true,
		margin: 25,
		autoplay: false,
		smartSpeed: 500,
		autoplayHoverPause: true
    }

}