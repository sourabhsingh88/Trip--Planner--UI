import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URLService } from "./url-service";
import { Observable } from "rxjs";

@Injectable()
export class CountryService{
    constructor(private httpClient : HttpClient,private urlService : URLService){
        console.log("Country Service : Object Created");
    }

    public findAll() :Observable<any> {
        return this.httpClient.get(this.urlService.countryFindAllAPI);
    }
}
