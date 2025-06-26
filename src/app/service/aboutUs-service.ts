import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URLService } from "./url-service";
import { Observable } from "rxjs";

@Injectable()
export class AboutUsService {
    constructor(private httpClient: HttpClient, private urlService: URLService) {
        console.log("AboutUsService : Object Created");
    }
    public findById(aboutUsId: number): Observable<any> {
        return this.httpClient.get(this.urlService.aboutUsFindBy + aboutUsId);
    }
}