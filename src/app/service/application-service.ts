import { Injectable } from "@angular/core";
import { URLService } from "./url-service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ApplicationService {
  constructor(private urlService: URLService, private httpClient: HttpClient) {
    console.log("ApplicationService initialized");
  }
  public applyForTripPlanner(applicationData: any):Observable<any> {
    console.log("Applying for Trip Planner with data:", applicationData);
    return this.httpClient.post(this.urlService.tripPlannerApplyAPI, applicationData);
  }
  public findAllByUserId(userId: number, page: number, size: number): Observable<any> {
    const url = `${this.urlService.tripPlannerFindByUserId}${userId}&page=${page}&size=${size}`;
    return this.httpClient.get(url);
  }
  public findById(applicationId: number): Observable<any> {
    const url = `${this.urlService.tripPlannerFindById}${applicationId}`;
    return this.httpClient.get(url);
  }

  
}