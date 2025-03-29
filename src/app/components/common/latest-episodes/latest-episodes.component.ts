import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-latest-episodes',
    templateUrl: './latest-episodes.component.html',
    styleUrls: ['./latest-episodes.component.scss',]
})
export class LatestEpisodesComponent implements OnInit {

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void {
    }

}