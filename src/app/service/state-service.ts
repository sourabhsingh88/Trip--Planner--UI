
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URLService } from "./url-service";
import { Observable } from "rxjs";

@Injectable()
export class StateService{
    constructor(private httpClient : HttpClient,private urlService : URLService){
        console.log("State Service : Object Created");
    }

    public findAll() :Observable<any> {
        return this.httpClient.get(this.urlService.stateFindAllAPI);
    }
}