import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputMaskDirective} from "../../shared/directives/input-mask/input-mask.directive";
import {MessageErrorsDirective} from "../../shared/directives/field-errors/directive/message-errors.directive";
import {NgSelectModule} from "@ng-select/ng-select";
import {AlertService} from "../../core/services/alert.service";
import {ProductService} from "../service/product.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryInterface, ProductInterface} from "../../core/interface/producto-interface";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    FormsModule,
    InputMaskDirective,
    MessageErrorsDirective,
    NgSelectModule,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit{


  public edit: FormGroup = new FormGroup({});

  product: ProductInterface = {
    id_product: '',
    name_product: '',
    description: '',
    price: 0,
    stock: 0,
    img: '',
    id_category: 0,
    name_category: '',
  };

  id: string = '';
  categories: CategoryInterface[] = [];

  constructor(
    private _alertService: AlertService,
    private _productService: ProductService,
    private dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.initFormUpdate();
    this.id = this.data.id;
    this.getProductById(this.id);
    this.getAllCategories();
  }


  private initFormUpdate() {
    this.edit = new FormGroup({
      name_product: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      stock: new FormControl('', [Validators.required, Validators.min(1)]),
      img: new FormControl('', [Validators.required]),
      id_category: new FormControl('', [Validators.required]),
    });
  }

  getProductById(id: string): void {
    this._productService.getOne(id).subscribe({
      next: (data: ProductInterface) => {
        this.edit.patchValue({
          name_product: data.name_product,
          description: data.description,
          price: data.price,
          stock: data.stock,
          img: data.img,
          name_category: data.name_category,
          id_category: data.id_category,

        });
        this.product = data;
      },
      error: (error) => {
        const errorMsg = error?.error?.msg || "Error desconocido";
        this._alertService.error(errorMsg);
      }
    });
  }

  sendUpdate(): void {
    if (this.edit.valid) {
      const data: any = {
        name: this.edit.get('name_product')?.value,
        description: this.edit.get('description')?.value,
        price: this.edit.get('price')?.value,
        stock: this.edit.get('stock')?.value,
        img: this.edit.get('img')?.value,
        id_category: this.edit.get('id_category')?.value,
      }
      this._productService.putProduct(this.id, data).subscribe({
          next: () => {
            this._alertService.success("Producto actualizado correctamente");
            this.edit.reset();
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

  getAllCategories(): void {
    this._productService.getAllCategories().subscribe({
        next: (data: CategoryInterface[]) => {
          this.categories = data;
        }
      }
    );
  }

  closeModal() {
    this.dialogRef.close(false);
  }

  // removeImage(index: number): void {
  //   this.product.images.splice(index, 1);
  //   this.images.splice(index, 1)
  //   this.edit.get('images')?.setValue(this.product.images.join(',').replaceAll('"', '').replaceAll('[', '').replaceAll(']', ''));
  // }

}
