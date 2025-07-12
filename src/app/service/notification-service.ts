import { Injectable } from "@angular/core";
import { URLService } from "./url-service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class NotificationService {
  constructor(private urlService: URLService, private httpClient: HttpClient) {
    console.log("NotificationService : Object Created");
  }

  public findAllByReceiverId(receiverId: number, page: number, size: number): Observable<any> {
    const url = `${this.urlService.notificationFindAll}${receiverId}&page=${page}&size=${size}`;
    return this.httpClient.get(url);
  }
  public markAsRead(notificationId: number): Observable<any> {
    const url = `${this.urlService.notificationMarkAsRead}${notificationId}`;
    return this.httpClient.put(url, {});
  }
}
