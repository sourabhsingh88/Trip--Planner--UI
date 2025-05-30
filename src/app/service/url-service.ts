import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class URLService{
    public readonly baseURL: string = "http://localhost:1002/booking-service-api-local/";

    public readonly userSaveAPI: string = this.baseURL + "user/signup";
    public readonly userLoginAPI: string = this.baseURL + "user/login";
    public readonly userFindByIdAPI: string = this.baseURL + "user/byId?id=";


     public readonly tripFindByAPI: string = this.baseURL + "trip/byid?id=";
    
    


    public readonly userUpdateAPI: string = this.baseURL + "user?task=userUpdate";
    
    public readonly userFindAllAPI: string = this.baseURL + "user?task=findAll";
    public readonly userFindByMobileNumberAPI: string = this.baseURL + "user?task=findByPhoneNumber&mobileNumber=";
    public readonly userDeletAPI: string = this.baseURL + "user?task=deleteById&userId=";
    public readonly userByIdAPI: string = this.baseURL + "user?task=findById&userId=";
    
    public readonly countryFindAllAPI: string = this.baseURL + "country?task=findAll";
    public readonly stateFindAllByCountryIdAPI: string = this.baseURL + "state?task=findAllByCountryId&countryId=";
    public readonly cityFindAllByStateIdAPI: string = this.baseURL + "city?task=findAllByStateId&stateId=";

    constructor(){
        console.log("URLService : Object Created")
    }
}