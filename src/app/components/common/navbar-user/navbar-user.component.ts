import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification-service';
import { UserService } from 'src/app/service/user-service';

@Component({
    selector: 'app-navbar-user',
    templateUrl: './navbar-user.component.html',
    styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent implements OnInit {

    public notifications: any[] = [];
  userId = parseInt(localStorage.getItem('userId')!);
  page = 0;
  size = 5;
  loading = false;
  lastPage = false;


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
        public userService: UserService,
        public notificationService: NotificationService,
    ) {
        this.getNotifications(this.userId);
        window.addEventListener('scroll', this.onScroll, true);
     }

    ngOnInit(): void {}

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    searchClassApplied = false;
    searchToggleClass() {
        this.searchClassApplied = !this.searchClassApplied;
    }
    notificationCount: number = 0;

     onNotificationClick(): void {
    console.log('Notification clicked');
    // maybe navigate to /notifications or show dropdown
  }
   logout() {
    this.userService.logout();
    this.router.navigate(['/index-2']); // ya /home ya default route
  }
   getNotifications(receiverId: number): void {
    if (this.loading || this.lastPage) return;

    this.loading = true;
    this.notificationService.findAllByReceiverId(receiverId, this.page, this.size).subscribe(
      (response) => {
        const newNotifs = response.data || [];

        this.notifications.push(...newNotifs);
        this.notificationCount = response.totalRecords;

        if (newNotifs.length < this.size || this.notifications.length >= response.totalRecords) {
          this.lastPage = true;
        }

        this.page++;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        alert(error.error?.message || 'Error fetching notifications');
        this.loading = false;
      }
    );
  }
  onScroll = (): void => {
    const threshold = 200;
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    if ((scrollTop + windowHeight + threshold) >= bodyHeight) {
      this.getNotifications(this.userId);
    }
  };

}