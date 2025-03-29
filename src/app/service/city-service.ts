import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URLService } from "./url-service";
import { Observable } from "rxjs";

@Injectable()
export class CityService{
    constructor(private httpClient : HttpClient,private urlService : URLService){
        console.log("City Service : Object Created");
    }

    public findAllByStateId(stateId : number) :Observable<any> {
        return this.httpClient.get(this.urlService.cityFindAllByStateIdAPI + stateId);
    }
}