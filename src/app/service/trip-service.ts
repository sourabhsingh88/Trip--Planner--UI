import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URLService } from "./url-service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private baseUrl = 'http://localhost:1002/booking-service-api-local/trip';
  selectedImage: File | null = null;
  bannerFiles: File[] = [];
  constructor(private http: HttpClient, private urlService: URLService) { }

  filterTrips(page: number, size: number, filters: any) {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (filters.to) params = params.set('to', filters.to);
    if (filters.from) params = params.set('from', filters.from);
    if (filters.startDuration) params = params.set('startDuration', filters.startDuration);
    if (filters.endDuration) params = params.set('endDuration', filters.endDuration);
    if (filters.startPrice) params = params.set('startPrice', filters.startPrice);
    if (filters.endPrice) params = params.set('endPrice', filters.endPrice);
    if (filters.keyword) params = params.set('keyword', filters.keyword);

    return this.http.get(`${this.baseUrl}/filterBy`, { params });
  }
  public findById(tripId: any): Observable<any> {
    return this.http.get(this.urlService.tripFindByAPI + tripId)
  }
  createTrip(tripJson: string, image: File, banners: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('tripCreateJson', tripJson);
    formData.append('image', image);

    banners.forEach((bannerFile) => {
      formData.append('tripBanner', bannerFile);
    });

    return this.http.post(this.urlService.tripSaveAPI, formData);
  }
  public getAllContinousTrips(tripPlannerId: number, page: number, size: number): Observable<any> {
    return this.http.get(`${this.urlService.tripAllContinueAPI}?tripPlannerId=${tripPlannerId}&page=${page}&size=${size}`);
  }
  public getAllDiscontinuedTrips(tripPlannerId: number, page: number, size: number): Observable<any> {
    return this.http.get(`${this.urlService.tripAllDiscontinueAPI}?tripPlannerId=${tripPlannerId}&page=${page}&size=${size}`);
  }
  public toggleTripStatus(tripId: number): Observable<any> {
    return this.http.put(`${this.urlService.tripToggelStatusAPI}?id=${tripId}`, {});
  }
}
