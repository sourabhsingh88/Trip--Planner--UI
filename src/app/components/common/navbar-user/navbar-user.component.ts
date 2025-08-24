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
  userPhotoUrl: string = 'assets/images/default.png';
  notificationCount: number = 0;
  roleIdMap: { [key: string]: number } = {
    customer: 1,
    tripplanner: 2,
    admin: 3
  };

  roleName: string | null = null;
  roleId: number = 0;



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
    
  }

  ngOnInit() {
    this.roleName = localStorage.getItem('role');
    if (this.roleName && this.roleIdMap[this.roleName]) {
      this.roleId = this.roleIdMap[this.roleName];
    }
    console.log("Role Name:", this.roleName); // e.g., tripplanner
    console.log("Role ID:", this.roleId);     // e.g., 2
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
    this.getNotifications(this.userId,this.roleId);
    window.addEventListener('scroll', this.onScroll, true);
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
  }
  logout() {
    this.userService.logout();
    this.router.navigate(['/index-2']);
  }
  getNotifications(receiverId: number,receiverRoleId: number): void {
    if (this.loading || this.lastPage) return;

    this.loading = true;
    this.notificationService.findAllByReceiverId(receiverId, receiverRoleId, this.page, this.size).subscribe(
      (response) => {
        const newNotifs = response.data || [];

        this.notifications.push(...newNotifs);
        this.notificationService.updateNotificationCount(response.totalRecords);

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
      this.getNotifications(this.userId,this.roleId); // Use roleId for fetching notifications
    }
  };

}