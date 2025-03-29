import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URLService } from "./url-service";
import { Observable } from "rxjs";

@Injectable()
export class UserService{
    constructor(private httpClient : HttpClient,private urlService : URLService){
        console.log("User Service : Object Created");
    }

    public save(requestView: any) :Observable<any> {
        return this.httpClient.post(this.urlService.userSaveAPI,requestView);
    }



    
    public upadte(requestView: any) :Observable<any> {
        return this.httpClient.post(this.urlService.userUpdateAPI,requestView);
    }
    
    public findByMobileNumber(mobileNumber: any) :Observable<any>{
        return this.httpClient.get(this.urlService.userFindByMobileNumberAPI + mobileNumber)
    }
    public findById(userId: number) :Observable<any>{
        return this.httpClient.get(this.urlService.userByIdAPI + userId)
    }
    public findAll() :Observable<any>{
        return this.httpClient.get(this.urlService.userFindAllAPI)
    }
    public login(requestView: any): Observable<any>{
        return this.httpClient.post(this.urlService.userLoginAPI,requestView)
    }
    public delete(userId : number): Observable<any>{
        return this.httpClient.get(this.urlService.userDeletAPI + userId)
    }
}

