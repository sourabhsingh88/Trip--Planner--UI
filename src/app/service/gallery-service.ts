import { HttpClient } from "@angular/common/http";
import { URLService } from "./url-service";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
@Injectable()
export class GalleryService {
   

    constructor(private http: HttpClient, private urlService: URLService) { }

    public getAllImages(page: number, size: number): Observable<any> {
        const paginatedURL = `${this.urlService.galleryAllAPI}?page=${page}&size=${size}`;
        return this.http.get(paginatedURL);
    }
   
}
