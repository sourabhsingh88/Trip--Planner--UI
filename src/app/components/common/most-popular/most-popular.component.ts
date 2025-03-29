import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-most-popular',
    templateUrl: './most-popular.component.html',
    styleUrls: ['./most-popular.component.scss']
})
export class MostPopularComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    featuredSlides: OwlOptions = {
		items: 1,
		nav: true,
		margin: 25,
		loop: true,
		dots: false,
		autoplay: false,
		smartSpeed: 500,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>"
		]
    }

}