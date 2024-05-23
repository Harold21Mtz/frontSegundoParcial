import {Component, Inject, OnInit} from '@angular/core';
import {CategoryInterface, ProductInterface} from "../../core/interface/producto-interface";
import {AlertService} from "../../core/services/alert.service";
import {ProductService} from "../service/product.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit{

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
  currentImageIndex: number = 0;

  constructor(
    private _productService: ProductService,
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

        // Verificar si la primera imagen es una cadena JSON y analizarla
        if (this.product.images.length > 0 && typeof this.product.images[0] === 'string') {
          if (this.product.images[0].startsWith('["')) {
            this.product.images[0] = JSON.parse(this.product.images[0])[0];
          }
        }

        console.log(this.product.images);
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      }
    });
  }


  closeModal() {
    this.dialogRef.close(false);
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.product.images.length - 1;
    }
  }

  nextImage() {
    if (this.currentImageIndex < this.product.images.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
  }
}
