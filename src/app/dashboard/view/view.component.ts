import {Component, Inject, OnInit} from '@angular/core';
import {ProductInterface} from "../../core/interface/producto-interface";
import {ProductService} from "../service/product.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../core/services/alert.service";

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit{

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

  constructor(
    private _productService: ProductService,
    private _alertService: AlertService,
    private dialogRef: MatDialogRef<ViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.id = this.data.id;
    this.getProductById(this.id);
  }

  getProductById(id: any): void {
    this._productService.getOne(id).subscribe({
      next: (data: ProductInterface) => {
        this.product = data;
      },
      error: (error) => {
        const errorMsg = error?.error?.msg || "Error desconocido";
        this._alertService.error(errorMsg);
      }
    });
  }

  closeModal() {
    this.dialogRef.close(false);
  }
}
