import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {
  public loginFormGroup: FormGroup;
  constructor(private userService : UserService, private formBuilder: FormBuilder, private router : Router) {
    console.log("SignInComponent : Object Created");

    
    this.loginFormGroup = formBuilder.group({
      userName: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
  })
   }

//    public login(){
//     console.log("Login User");
//     console.log(this.loginFormGroup.valid);
//     console.log(this.loginFormGroup.value);
//     this.userService.login(this.loginFormGroup.value).subscribe(
//         (successResponse) =>{
//             console.log(successResponse);
//             alert(successResponse.message);
//             this.router.navigate(['/index-2']);
//         },
//         (errorResponse) =>{
//             console.log(errorResponse);
//             alert(errorResponse.error.message);
//             // window.location.reload(); // Page refresh hoga
//         }
//     );
// }

        public login() {
          this.userService.login(this.loginFormGroup.value).subscribe(
            (res) => {
              this.userService.saveUserData(res.data);
              const roles = res.data.roles;
              if (roles.length === 1) {
                this.router.navigate(['/index-2']);
              } else {
                this.router.navigate(['/select-role']);
              }
            },
            (error) => {
              alert(error.error.message);
            }
          );
        }

}
