import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-featured-shows',
    templateUrl: './featured-shows.component.html',
    styleUrls: ['./featured-shows.component.scss']
})
export class FeaturedShowsComponent implements OnInit {

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void {
    }

}