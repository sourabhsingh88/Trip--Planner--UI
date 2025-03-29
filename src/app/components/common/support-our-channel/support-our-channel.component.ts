import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-support-our-channel',
    templateUrl: './support-our-channel.component.html',
    styleUrls: ['./support-our-channel.component.scss']
})
export class SupportOurChannelComponent implements OnInit {

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void {}

}