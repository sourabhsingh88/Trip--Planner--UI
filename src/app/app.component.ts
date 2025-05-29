import { Component, OnInit } from '@angular/core';
import { Router, NavigationCancel, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { filter } from 'rxjs/operators';
import { UserService } from './service/user-service';
declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent  implements OnInit{

    title = 'Goca - Angular 16 Podcast Theme + Admin Dashboard';

    location: any;
    routerSubscription: any;



    isLoggedIn = false;
    userRole: string | null = null;
    constructor(private router: Router,private userService: UserService) {
        
    }

    ngOnInit() {
  this.recallJsFuntions();

  // Step 1: check login
  this.isLoggedIn = this.userService.isLoggedIn();

  // Step 2: Try to fetch directly from localStorage (on page reload)
  this.userRole = this.userService.getRole();
//   this.userRole = localStorage.getItem('role');

  // Step 3: Subscribe to service stream (for future changes)
  this.userService.role$.subscribe(role => {
    console.log("Role updated via service stream: ", role);
    this.userRole = role;
    this.isLoggedIn = this.userService.isLoggedIn();  // 🔥 Add this line
  });

  console.log("User from localStorage:", localStorage.getItem('user'));
  console.log("Role from localStorage:", this.userRole);
  console.log("isLoggedIn:", this.isLoggedIn);
}

    recallJsFuntions() {
        this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
        .subscribe(event => {
            this.location = this.router.url;
            if (!(event instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }

}