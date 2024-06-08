import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AuthInterface} from "../../core/interface/auth-interface";
import {TokenInterface} from "../../core/interface/token-interface";
import {UserRegisterInterface} from "../../core/interface/user-register-interface";
import {EmailInterface} from "../../core/interface/email-interface";
import {AuthSessionInterface} from "../../core/interface/auth-session-interface";
import {EndPoints} from "../../core/utils/end-points";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient,
              @Inject(PLATFORM_ID) private platformId: Object,
              private router: Router) {
  }

  public register(data: UserRegisterInterface): Observable<any>{
    return this._http.post<any>(EndPoints.REGISTER, data);
  }

  public login(data: AuthInterface): Observable<TokenInterface>{
    return this._http.post<TokenInterface>(EndPoints.LOGIN, data);
  }

  public getUserSession(): Observable<AuthSessionInterface> {
    return this._http.get<AuthSessionInterface>(EndPoints.USER_SESSION);
  }

  public verifyEmail(data: EmailInterface): Observable<boolean>{
    return this._http.post<boolean>(EndPoints.EXISTS_EMAIL, data);
  }

  public logout(){
    localStorage.clear();
    this.router.navigateByUrl('/auth').then(() => {
      location.reload();
    });
  }
}
