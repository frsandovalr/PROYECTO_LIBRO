import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/models/user-interface';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService, 
    private router: Router,
    private location : Location
    ) { }
  private user: UserInterface = {
    email: "",
    password: ""
  };

  ngOnInit() {
  }
  onLogin(){
    return this.authService.loginUser(this.user.email, this.user.password)
    .subscribe(data => {
     this.authService.setUser(data.user);
     const token = data.id;
     this.authService.setToken(token);
     this.router.navigate(["/user/profile"]);
     location.reload();
    },
    error => console.log(error)
    );
  }
}
