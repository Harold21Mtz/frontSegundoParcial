import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AlertService} from "../../core/services/alert.service";
import {ProductService} from "../service/product.service";
import {InputMaskDirective} from "../../shared/directives/input-mask/input-mask.directive";
import {MessageErrorsDirective} from "../../shared/directives/field-errors/directive/message-errors.directive";
import {CategoryInterface} from "../../core/interface/producto-interface";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatDialogRef} from "@angular/material/dialog";
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputMaskDirective,
    MessageErrorsDirective,
    NgSelectModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent  implements OnInit{

  public register: FormGroup = new FormGroup({});

  categories: CategoryInterface[] = [];

  constructor(
    private _alertService: AlertService,
    private _productService: ProductService,
    private dialogRef: MatDialogRef<CreateComponent>
  ) {
  }

  ngOnInit(): void {
    this.initFormRegister();
    this.getAllCategories();
  }

  private initFormRegister() {
    this.register = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      stock: new FormControl('', [Validators.required, Validators.min(1)]),
      img: new FormControl('', [Validators.required]),
      id_category: new FormControl(null, [Validators.required]),
    });
  }

  sendRegister(): void {
    if (this.register.valid) {

      const data: any = {
        name: this.register.get('name')?.value,
        description: this.register.get('description')?.value,
        price: this.register.get('price')?.value,
        stock: this.register.get('stock')?.value,
        img: this.register.get('img')?.value,
        id_category: this.register.get('id_category')?.value,
      }
      this._productService.postProduct(data).subscribe({
          next: () => {
            this._alertService.success("Producto agregado correctamente");
            this.register.reset();
            this.dialogRef.close(true);
          },
          error: (error) => {
            const errorMsg = error?.error?.msg || "Error desconocido";
            this._alertService.error(errorMsg);
          }
        }
      )
    } else {
      this._alertService.error("Datos incompletos")
    }
  }

  closeModal() {
    this.dialogRef.close(false);
  }

  getAllCategories(): void {
    this._productService.getAllCategories().subscribe({
        next: (data: CategoryInterface[]) => {
          this.categories = data;
        }
      }
    );
  }

}
