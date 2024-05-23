import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AuthInterface} from "../../core/interface/auth-interface";
import {TokenInterface} from "../../core/interface/token-interface";
import {UserRegisterInterface} from "../../core/interface/user-register-interface";
import {ValidEmailInterface} from "../../core/interface/valid-email-interface";
import {EmailInterface} from "../../core/interface/email-interface";
import {BrowserStorageService} from "../../core/services/storage.service";
import {AuthSessionInterface} from "../../core/interface/auth-session-interface";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "https://api.escuelajs.co/api/v1/";

  constructor(private _http: HttpClient,
              private router: Router,
              private _local: BrowserStorageService) {
  }

  public register(data: UserRegisterInterface): Observable<any>{
    return this._http.post(`${this.baseUrl}users/`, data);
  }

  public login(data: AuthInterface): Observable<TokenInterface>{
    return this._http.post<TokenInterface>(`${this.baseUrl}auth/login`, data);
  }

  public getUserSession(): Observable<AuthSessionInterface>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`

    });
    return this._http.get<AuthSessionInterface>(`${this.baseUrl}auth/profile`, {headers});
  }

  public verifyEmail(data: EmailInterface): Observable<ValidEmailInterface>{
    return this._http.post<ValidEmailInterface>(`${this.baseUrl}users/is-available`, data);
  }

  public logout(){
    this._local.clear();
    this.router.navigateByUrl('/auth').then(() => {
      location.reload();
    });
  }
}
