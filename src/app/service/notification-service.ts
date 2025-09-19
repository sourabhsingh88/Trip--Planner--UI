import { Injectable } from "@angular/core";
import { URLService } from "./url-service";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class NotificationService {

  private notificationCountSubject = new BehaviorSubject<number>(0);
  public notificationCount$ = this.notificationCountSubject.asObservable();



  constructor(private urlService: URLService, private httpClient: HttpClient) {
    console.log("NotificationService : Object Created");
  }

  public findAllByReceiverId(receiverId: number,receiverRoleId: number,  page: number, size: number): Observable<any> {
    const url = `${this.urlService.notificationFindAll}${receiverId}&receiverRoleId=${receiverRoleId}&page=${page}&size=${size}`;
    return this.httpClient.get(url);
  }
  public markAsRead(notificationId: number): Observable<any> {
    const url = `${this.urlService.notificationMarkAsRead}${notificationId}`;
    return this.httpClient.put(url, {});
  }
  public updateNotificationCount(count: number) {
    this.notificationCountSubject.next(count);
  }
}
