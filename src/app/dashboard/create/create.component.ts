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

  imageArray: string[] = [];

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
      title: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      categoryId: new FormControl(null, [Validators.required]),
      images: new FormControl('', [Validators.required])
    });
  }

  sendRegister(): void {
    if (this.register.valid) {
      this.imageArray.push(this.register.get('images')?.value)

      const data: any = {
        title: this.register.get('title')?.value,
        price: this.register.get('price')?.value,
        description: this.register.get('description')?.value,
        categoryId: this.register.get('categoryId')?.value,
        images: this.imageArray
      }
      console.log("´------------------"+this.imageArray);
      this._productService.postProduct(data).subscribe({
          next: (r) => {
            this._alertService.success("Producto agregado correctamente");
            this.register.reset();
            this.dialogRef.close(true);
          },
          error: (err) => {
            this._alertService.error(err.error.message);
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
