import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent  {

  public signupFormGroup: FormGroup;
  constructor(private userService : UserService, private formBuilder: FormBuilder, private router : Router ){
    console.log("SignUpComponent : Object Created");
    this.signupFormGroup = formBuilder.group({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      phoneNumber: new FormControl('',[Validators.required]),
      gender:new FormControl(''),
      password: new FormControl('',[Validators.required]),
      dob: new  FormControl(new Date),
      locationName : new FormControl(''),
      cityId: new FormControl(1),
  })
}

public signup(){
  console.log("SignUp");
  console.log(this.signupFormGroup.valid);
  console.log(this.signupFormGroup.value);

  this.userService.save(this.signupFormGroup.value).subscribe(
      (successResponse) =>{
          console.log(successResponse);
          alert(successResponse.message); 
          this.router.navigate(['/sign-in'])
      },
      (errorResponse) =>{
          console.log(errorResponse);
          alert(errorResponse.error.message);
          // window.location.reload(); // Page refresh hoga
      }
  );
}

}
