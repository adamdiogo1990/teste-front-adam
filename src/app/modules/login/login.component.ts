import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { Error } from 'src/app/models/Error';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user:User = { email: '', password: '' };
  error:Error = { error: false, message: '' };
  loading: boolean = false;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.error.error = false;
    this.loginService.login(this.user)
      .then((data: any) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/contact-list']);
        this.loading = false;
      }).catch((error:any) => {
        this.error.error = true;
        this.error.message = error.message;
        this.loading = false;
        console.warn('from component:', error);
      });
  }
}
