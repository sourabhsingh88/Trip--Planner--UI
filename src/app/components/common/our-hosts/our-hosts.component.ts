import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-our-hosts',
    templateUrl: './our-hosts.component.html',
    styleUrls: ['./our-hosts.component.scss']
})
export class OurHostsComponent implements OnInit {

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void {
    }

}