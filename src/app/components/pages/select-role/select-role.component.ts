import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripPlannerService } from 'src/app/service/tripplanner-service';
import { UserService } from 'src/app/service/user-service';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss']
})
export class SelectRoleComponent implements OnInit {

  user: any;
  roles: any[] = [];

  constructor(private userService: UserService, private router: Router,private tripPlannerService : TripPlannerService) {}

  ngOnInit():void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.roles = this.user.roles || [];
  }

  selectRole(role: string) {
    this.userService.setRole(role);
     this.router.navigate(['/index-2']);
     if (role === 'tripplanner') {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id;
    this.tripPlannerService.findById(userId).subscribe({
      next: (res: any) => {
        const tripPlannerId = res.data.id;
        localStorage.setItem('tripPlannerId', tripPlannerId);
        this.router.navigate(['/index-2']);
      },
      error: (err) => {
        console.error("TripPlanner not found for userId", err);
        alert("TripPlanner profile not found. Please contact admin.");
      }
    });
  } else {
    this.router.navigate(['/index-2']);
  }
    // Redirect to main page

    
  }
}
