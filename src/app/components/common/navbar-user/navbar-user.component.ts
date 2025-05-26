import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service';

@Component({
    selector: 'app-navbar-user',
    templateUrl: './navbar-user.component.html',
    styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent implements OnInit {

    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    constructor(
		public router: Router,
        public userService: UserService
    ) { }

    ngOnInit(): void {}

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    searchClassApplied = false;
    searchToggleClass() {
        this.searchClassApplied = !this.searchClassApplied;
    }
    notificationCount: number = 5;

     onNotificationClick(): void {
    console.log('Notification clicked');
    // maybe navigate to /notifications or show dropdown
  }
   logout() {
    this.userService.logout();
    this.router.navigate(['/index-2']); // ya /home ya default route
  }

}