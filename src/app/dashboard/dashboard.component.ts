import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {AlertService} from "../core/services/alert.service";
import {ProductService} from "./service/product.service";
import {LowerCasePipe, NgForOf, NgIf} from "@angular/common";
import {ProductInterface} from "../core/interface/producto-interface";
import {CreateComponent} from "./create/create.component";
import {UpdateComponent} from "./update/update.component";
import {MatDialog} from "@angular/material/dialog";
import {ViewComponent} from "./view/view.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    LowerCasePipe,
    CreateComponent,
    UpdateComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  products: ProductInterface[] = [];

  constructor(
    private _alertService: AlertService,
    private _productService: ProductService,
    private _dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
   this.getAllProducts();
  }

  getAllProducts(): void {
    this._productService.getAll().subscribe({
        next: (data: ProductInterface[]) => {
          this.products = data;
          data.forEach(
            (item: any) => {
              if (item.images[0].startsWith('["')) {
                item.images = JSON.parse(item.images);
              }
            }
          )
        }
      }
    );
  }

  deleteProductById(id: any, event: Event) {
    event.stopPropagation();
    this._productService.deleteProduct(id).subscribe({
      next: (): void => {
        this._alertService.success("Producto eliminado correctamente");
        this.getAllProducts();
      }
    })

  }

  openModalCreate() {
    const dialogRef = this._dialog.open(CreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllProducts();
      }
    });
  }

  openModalUpdate(id: string, event: Event) {
    event.stopPropagation();
    const dialogRef = this._dialog.open(UpdateComponent,{
      data: {id},
      }
      );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllProducts();
      }
    });
  }

  openModalProductById(id: string) {
    const dialogRef = this._dialog.open(ViewComponent,{
      data: {id},
      height: '90dvh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllProducts();
      }
    });
  }

}
