import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification-service';
import { UserService } from 'src/app/service/user-service';

@Component({
    selector: 'app-navbar-planner',
    templateUrl: './navbar-planner.component.html',
    styleUrls: ['./navbar-planner.component.scss']
})
export class NavbarPlannerComponent implements OnInit {

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
    public notifications: any[] = [];
    userId = parseInt(localStorage.getItem('userId')!);
    page = 0;
    size = 5;
    loading = false;
    lastPage = false;
    userPhotoUrl: string = 'assets/images/default.png';
    notificationCount: number = 0;


    constructor(
        public router: Router,
        public userService: UserService,
        public notificationService: NotificationService,
    ) { }

    ngOnInit(): void {
        const localUser = this.userService.getCurrentUser();
        if (localUser?.profileImage) {
            this.userPhotoUrl = `http://localhost:1002/booking-service-api-local/user/${localUser.profileImage}`;
        }

        this.userService.user$.subscribe((updatedUser) => {
            if (updatedUser?.profileImage) {
                this.userPhotoUrl = `http://localhost:1002/booking-service-api-local/user/${updatedUser.profileImage}`;
            }
        });
        this.notificationService.notificationCount$.subscribe(count => {
            this.notificationCount = count;
        });
    }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    searchClassApplied = false;
    searchToggleClass() {
        this.searchClassApplied = !this.searchClassApplied;
    }


    onNotificationClick(): void {
        console.log('Notification clicked');
        // maybe navigate to /notifications or show dropdown
    }
    logout() {
        this.userService.logout();
        this.router.navigate(['/index-2']); // ya /home ya default route
    }

}