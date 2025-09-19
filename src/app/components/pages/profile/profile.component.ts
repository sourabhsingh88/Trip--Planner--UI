import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/service/user-service";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private userService: UserService, private router: Router) {
    console.log("ProfileComponent : Object Created");
    this.findById();
  }
  public userResponseList: any = {};
  userId = localStorage.getItem('userId');
  userRole = localStorage.getItem('role');





  public findById() {
    this.userService.findById(this.userId).subscribe(
      (successResponse) => {
        console.log(successResponse);
        this.userResponseList = successResponse.data;
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }
  goToUpdateProfile() {
    const userId = this.userResponseList.id;
    this.router.navigate(['/profile-update', userId], {
      state: { user: this.userResponseList }
    });
  }

}