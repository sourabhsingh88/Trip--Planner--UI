import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URLService } from "./url-service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TripService{
    private baseUrl = 'http://localhost:1002/booking-service-api-local/trip';
    constructor(private http: HttpClient,private urlService : URLService) {}

  filterTrips(page: number, size: number, filters: any) {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (filters.to) params = params.set('to', filters.to);
    if (filters.from) params = params.set('from', filters.from);
    if (filters.duration) params = params.set('duration', filters.duration);
    if (filters.price) params = params.set('price', filters.price);
    if (filters.keyword) params = params.set('keyword', filters.keyword);

    return this.http.get(`${this.baseUrl}/filterBy`, { params });
  }
  public findById(tripId: any) :Observable<any>{
          return this.http.get(this.urlService.tripFindByAPI + tripId)
      }
}
