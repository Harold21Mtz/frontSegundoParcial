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

  constructor(
    private _authService: AuthService,
    private _alertService: AlertService) {
  }

  ngOnInit(): void {
    this.getDataOfUserSession();
  }

  logout() {
    this._authService.logout();
  }

  getDataOfUserSession() {
    this._authService.getUserSession().subscribe({
      next: (data: AuthSessionInterface) => {
        this.userData = data;
      },
      // error: (err) => {
      //   this._alertService.error(err.message);
      // }
    });
  }
}
