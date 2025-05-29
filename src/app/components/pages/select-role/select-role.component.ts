import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss']
})
export class SelectRoleComponent implements OnInit {

  user: any;
  roles: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit():void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.roles = this.user.roles || [];
  }

  selectRole(role: string) {
    this.userService.setRole(role);
    this.router.navigate(['/index-2']); // Redirect to main page
  }
}
