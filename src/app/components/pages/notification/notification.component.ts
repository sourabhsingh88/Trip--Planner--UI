import { Component, OnInit } from "@angular/core";
import { NotificationService } from "src/app/service/notification-service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  public notifications: any[] = [];
  userId = parseInt(localStorage.getItem('userId')!);
  page = 0;
  size = 5;
  loading = false;
  lastPage = false;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getNotifications(this.userId);
    window.addEventListener('scroll', this.onScroll, true);
  }

  // ✅ Load notifications with pagination
  getNotifications(receiverId: number): void {
    if (this.loading || this.lastPage) return;

    this.loading = true;
    this.notificationService.findAllByReceiverId(receiverId, this.page, this.size).subscribe(
      (response) => {
        const newNotifs = response.data || [];

        this.notifications.push(...newNotifs);

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

  // ✅ Mark notification as read + refresh list


  onNotificationClick(notif: any): void {
    
    
      this.notificationService.markAsRead(notif.id).subscribe({
        next: () => {
          
          this.notifications = [];
          this.page = 0;
          this.lastPage = false;
          this.getNotifications(this.userId);
        },
        error: (err) => {
          console.error("❌ Error marking notification as read:", err);
        }
      });
  }

  // ✅ Lazy scroll loading
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
