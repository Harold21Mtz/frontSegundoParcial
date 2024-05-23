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

  imageArray: string[] = [];
  images: string[] = [];

  category: CategoryInterface = {
    id: '',
    name : '' ,
    image : ''
  };

  product: ProductInterface = {
    category: this.category,
    id: '',
    title: '',
    description: '',
    price: 0,
    images: []
  };

  id: string = '';

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
  }


  private initFormUpdate() {
    this.edit = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(400), Validators.minLength(4)]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      images: new FormControl('')
    });
  }

  getProductById(id: string): void {
    this._productService.getOne(id).subscribe({
      next: (data: ProductInterface) => {
        const images=  data.images.map( (value: string) => value.replaceAll('"', '').replaceAll('[', '').replaceAll(']', ''));
        this.edit.patchValue({
          title: data.title,
          price: data.price,
          description: data.description,
          images: images
        });
        this.product = data;
        this.imageArray = data.images;
        this.images = images;

      },
      error: (err) => {
        this._alertService.error("No se pudo obtener el producto");
      }
    });
  }

  sendUpdate(): void {
    if (this.edit.valid) {
      const data: any = {
        title: this.edit.get('title')?.value,
        price: this.edit.get('price')?.value,
        description: this.edit.get('description')?.value,
        images: [this.edit.get('images')?.value],
      }
      this._productService.putProduct(this.id, data).subscribe({
          next: () => {
            this._alertService.success("Producto actualizado correctamente");
            this.edit.reset();
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

  removeImage(index: number): void {
    this.product.images.splice(index, 1);
    this.images.splice(index, 1)
    this.edit.get('images')?.setValue(this.product.images.join(',').replaceAll('"', '').replaceAll('[', '').replaceAll(']', ''));
  }


}
