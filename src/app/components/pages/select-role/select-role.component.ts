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

  if (role === 'tripplanner') {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id;

    this.tripPlannerService.findById(userId).subscribe({
      next: (res: any) => {
        const tripPlannerId = res.data.id;
        localStorage.setItem('tripPlannerId', tripPlannerId);
        this.router.navigate(['/index-2']); // ✅ Tripplanner ka dashboard
      },
      error: (err) => {
        console.error("TripPlanner not found for userId", err);
        alert("TripPlanner profile not found. Please contact admin.");
      }
    });
  } 
  else if (role === 'admin') {
    this.router.navigate(['/admin']); // ✅ Admin panel ka route
  }
  else if (role === 'customer') {
    this.router.navigate(['/index-2']); // ✅ Normal user dashboard
  }
}

}
