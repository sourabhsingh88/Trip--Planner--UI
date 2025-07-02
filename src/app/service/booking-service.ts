import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URLService } from "./url-service";
import { Observable } from "rxjs";

@Injectable()
export class BookingService {

  constructor(private httpClient: HttpClient,private urlService : URLService) {
    console.log("BookingService : Object Created");
  }
  public createBooking(bookingData: any): Observable<any> {
    console.log("Creating booking with data:", bookingData);
    return this.httpClient.post(this.urlService.bookingCreateAPI, bookingData);
  }

  findByUserId(userId: number, page: number, size: number): Observable<any> {
    const url = `${this.urlService.bookingFindByUserIdAPI}${userId}&page=${page}&size=${size}`;
    return this.httpClient.get(url);
  }

  findByTripPlannerId(tripplannerId: number, page: number, size: number): Observable<any> {
    const url = `${this.urlService.bookingFindByTripplannerIdAPI}${tripplannerId}&page=${page}&size=${size}`;
    return this.httpClient.get(url);
  }

  updateBookingStatus(payload: { id: number, statusId: number }): Observable<any> {
    return this.httpClient.put(`${this.urlService.bookingStatusUpdateAPI}`, payload);
  }



}