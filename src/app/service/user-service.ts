import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URLService } from "./url-service";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class UserService{

    private roleSubject = new BehaviorSubject<string | null>(null);
    public role$ = this.roleSubject.asObservable();

    constructor(private httpClient : HttpClient,private urlService : URLService){
        console.log("User Service : Object Created");
        this.loadUserRoleFromStorage(); // Load role on service init
    }

    public save(requestView: any) :Observable<any> {
        return this.httpClient.post(this.urlService.userSaveAPI,requestView);
    }

    public findById(userId: any) :Observable<any>{
        return this.httpClient.get(this.urlService.userFindByIdAPI + userId)
    }

    
    public upadte(requestView: any) :Observable<any> {
        return this.httpClient.post(this.urlService.userUpdateAPI,requestView);
    }
    
    public findByMobileNumber(mobileNumber: any) :Observable<any>{
        return this.httpClient.get(this.urlService.userFindByMobileNumberAPI + mobileNumber)
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

    public saveUserData(user: any): void {
        localStorage.setItem('user', JSON.stringify(user));
        const userId= JSON.parse(localStorage.getItem('user') || '{}').id;
        localStorage.setItem('userId', userId);
        const roles = user.roles;

        if (roles.length === 1) {
        const role = roles[0].name;
        localStorage.setItem('role', role);
        this.roleSubject.next(role);
        } else {
        // Multiple roles — no default selection
        localStorage.setItem('role', '');
        this.roleSubject.next('');
        }
  }
  
isLoggedIn(): boolean {
  const user = localStorage.getItem('user');
  const role = localStorage.getItem('role');
  return !!user && role !== null && role.trim() !== '';
}




  public  setRole(role: string): void {
    localStorage.setItem('role', role);
    this.roleSubject.next(role);
  }

 
  loadUserRoleFromStorage() {
  const role = localStorage.getItem('role');
  this.roleSubject.next(role);
}

  getRole(): string | null {
    return localStorage.getItem('role');
  }

logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  this.roleSubject.next(null);

}

}

