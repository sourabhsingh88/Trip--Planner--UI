import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/service/user-service";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  
  constructor(private userService : UserService, private router : Router) {
      console.log("ProfileComponent : Object Created");
      this.findById();
  }
  public userResponseList: any = {};
  userId = localStorage.getItem('userId');
  userRole = localStorage.getItem('role');

  

  

  public findById(){
  this.userService.findById(this.userId).subscribe(
      (successResponse) =>{
          console.log(successResponse);
          this.userResponseList = successResponse.data;
      },
      (errorResponse) =>{
          console.log(errorResponse);
      }
  );
}

 user = {
    name: this.userResponseList.name ,
    role: this.userResponseList.role,
    email: this.userResponseList.email,
    phone: this.userResponseList.phoneNumber,
    DOB: this.userResponseList.dob,
    Gender:this.userResponseList.gender,
    location: 'Indore,India',
    about: `A passionate full stack developer with 5+ years of experience building scalable web apps using Angular, Spring Boot, and MySQL.`,
    skills: ['Angular', 'Spring Boot', 'Java', 'MySQL', 'REST APIs'],
    profileImg: 'https://i.pravatar.cc/150?img=3'
  };

}