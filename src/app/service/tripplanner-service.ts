import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URLService } from "./url-service";
import { Observable } from "rxjs";

@Injectable()
export class TripPlannerService {

  constructor(private httpClient: HttpClient, private urlService: URLService) {
    console.log("TripPlannerService : Object Created");
  }

  public findById(userId: number): Observable<any> {
    console.log("Finding trip planner by user ID:", userId);
    return this.httpClient.get(this.urlService.tripPlannerFindApprovedById + userId);
  }

  
}