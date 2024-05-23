import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {InputMaskDirective} from "../shared/directives/input-mask/input-mask.directive";
import {MessageErrorsDirective} from "../shared/directives/field-errors/directive/message-errors.directive";
import {AlertService} from "../core/services/alert.service";
import {AuthService} from "./service/auth.service";
import {BrowserStorageService} from "../core/services/storage.service";
import {ValidEmailInterface} from "../core/interface/valid-email-interface";

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

  hide = true;
  right_panel: string = '';
  showRegister: boolean = false;
  emailExists: boolean = false;

  constructor(
    private _router: Router,
    private _alert: AlertService,
    private _auth: AuthService,
    private _local: BrowserStorageService,
  ) {
  }

  ngOnInit(): void {
    this.initFormLogin();
    this.initFormRegister();
  }

  private initFormRegister() {
    this.register = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      avatar: new FormControl(''),
    });
  }

  private initFormLogin() {
    this.login = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  viewRegister() {
    this.showRegister = !this.showRegister;
  }

  navigateTo(): void {
    this._router.navigateByUrl("/").then();
  }

  activeActivePanel() {
    this.login.reset();
    this.right_panel = 'right-panel-active';
  }

  removeActivePanel() {
    this.register.reset();
    this.right_panel = '';
  }

  sendLogin() {
    if (this.login.valid) {
      const data: any = {
        email: this.login.get('email')?.value,
        password: this.login.get('password')?.value,
      }
      this._auth.login(data).subscribe({
        next: (data) => {
          this._local.setItem('accessToken', data.access_token);
          this._local.setItem('refreshToken', data.refresh_token);
          this._router.navigateByUrl("/principal").then();
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
        name: this.register.get('name')?.value,
        password: this.register.get('password')?.value,
        email: this.register.get('email')?.value,
        avatar: this.register.get('avatar')?.value,
        role: 'customer'
      }
      this._auth.register(data).subscribe({
        next : () => {
          this._alert.success("Usuario registrado");
          this.register.reset();
          this.right_panel = '';
        },
        error : (r) => {
          this._alert.error(r.error.message);
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
      next: (value: ValidEmailInterface) => {
        this.emailExists = value.isAvailable;
        if (this.emailExists) {
          this._alert.warning("Correo en uso, elige otro");
        }
      },
      error: (error: any) => {
        console.error('Error al verificar el correo electrónico:', error);
      }
    });
  }

}
