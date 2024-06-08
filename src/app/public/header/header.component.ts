import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../login/service/auth.service";
import {AuthSessionInterface} from "../../core/interface/auth-session-interface";
import {NgIf} from "@angular/common";
import {AlertService} from "../../core/services/alert.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userData: AuthSessionInterface = {
    id_user: '',
    username: '',
    email: '',
    avatar: '',
  };

  username: string | null = '';
  avatar: string | null= '';

  constructor(
    private _authService: AuthService,
    private _alertService: AlertService) {
  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.username = localStorage.getItem('username');
      this.avatar = localStorage.getItem('avatar');
    }

    if(this.username == null && this.avatar  == null){
      this.getDataOfUserSession();
    }
  }

  logout() {
    this._authService.logout();
  }

  getDataOfUserSession() {
    this._authService.getUserSession().subscribe({
      next: (data: AuthSessionInterface) => {
        this.username = data.username;
        this.avatar = data.avatar;
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem("username", data.username);
          localStorage.setItem("avatar", data.avatar);
        }
      },
      // error: (err) => {
      //   this._alertService.error(err.message);
      // }
    });
  }
}
