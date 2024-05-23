import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryInterface, NewProduct, ProductInterface, UpdateProduct} from "../../core/interface/producto-interface";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "https://api.escuelajs.co/api/v1/";

  constructor(private _http: HttpClient) {
  }

  getAll() : Observable<ProductInterface[]>{
    return this._http.get<ProductInterface[]>(`${this.baseUrl}products`)
  }

  getOne(id : string):Observable<ProductInterface>{
    return this._http.get<ProductInterface>(`${this.baseUrl}products/${id}`)
  }

  postProduct(data : NewProduct):Observable<any>{
    return this._http.post(`${this.baseUrl}products`, data)
  }

  putProduct(id: string, data: UpdateProduct):Observable<any>{
    return this._http.put(`${this.baseUrl}products/${id}`, data)
  }

  deleteProduct(id : string):Observable<any>{
    return this._http.delete(`${this.baseUrl}products/${id}`)
  }

  getAllCategories() : Observable<CategoryInterface[]>{
    return this._http.get<CategoryInterface[]>(`${this.baseUrl}categories`)
  }

}
