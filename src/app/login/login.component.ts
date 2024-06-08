import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {InputMaskDirective} from "../shared/directives/input-mask/input-mask.directive";
import {MessageErrorsDirective} from "../shared/directives/field-errors/directive/message-errors.directive";
import {AlertService} from "../core/services/alert.service";
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    NgOptimizedImage,
    InputMaskDirective,
    MessageErrorsDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public login: FormGroup = new FormGroup({});
  public register: FormGroup = new FormGroup({});

  right_panel: string = '';
  showRegister: boolean = false;

  constructor(
    private _router: Router,
    private _alert: AlertService,
    private _auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.initFormLogin();
    this.initFormRegister();
  }

  private initFormRegister() {
    this.register = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      avatar: new FormControl(''),
    });
  }

  private initFormLogin() {
    this.login = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]),
      password: new FormControl('', [Validators.required]),
    });
  }

  viewRegister() {
    this.showRegister = !this.showRegister;
  }

  sendLogin() {
    if (this.login.valid) {
      const data: any = {
        username: this.login.get('username')?.value,
        password: this.login.get('password')?.value,
      }
      this._auth.login(data).subscribe({
        next: (data) => {
          localStorage.setItem('accessToken', data.token);
          this._router.navigateByUrl("/principal").then();
        },
        error: (error) => {
          const errorMsg = error?.error?.msg || "Error desconocido";
          this._alert.error(errorMsg);
        }
      })
    } else {
      this._alert.error("Datos incompletos");
      this.login.markAllAsTouched();
    }
  }

  sendRegister() {
    if (this.register.valid) {
      const data: any = {
        username: this.register.get('username')?.value,
        password: this.register.get('password')?.value,
        email: this.register.get('email')?.value,
        avatar: this.register.get('avatar')?.value,
      }
      this._auth.register(data).subscribe({
        next : () => {
          this._alert.success("Usuario registrado");
          this.register.reset();
          this.right_panel = '';
        },
        error : (r) => {
          this._alert.error(r.message);
        }
      })
    } else {
      this._alert.error("Datos incompletos");
      this.login.markAllAsTouched();
    }
  }

  validateEmail() {
    const data: any = {
      email: this.register.get('email')?.value,
    };

    this._auth.verifyEmail(data).subscribe({
      next: (value: boolean) => {
        if (value) {
          this._alert.warning("Correo en uso, elige otro por favor");
        }
      },
      error: (error: any) => {
        console.error('Error al verificar el correo electrónico:', error);
      }
    });
  }

}
