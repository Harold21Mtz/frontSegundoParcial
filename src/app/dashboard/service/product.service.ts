import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryInterface, NewProduct, ProductInterface, UpdateProduct} from "../../core/interface/producto-interface";
import {EndPoints} from "../../core/utils/end-points";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) {
  }

  getAll() : Observable<ProductInterface[]>{
    return this._http.get<ProductInterface[]>(EndPoints.GET_ALL_PRODUCTS)
  }

  getAllByCategoryId(id: string) : Observable<ProductInterface[]>{
    return this._http.get<ProductInterface[]>(EndPoints.GET_ALL_PRODUCTS_BY_CATEGORY_ID+id)
  }

  getAllCategoriesWithProducts() : Observable<CategoryInterface[]>{
    return this._http.get<CategoryInterface[]>(EndPoints.GET_ALL_CATEGORIES_WITH_PRODUCTS)
  }

  getOne(id : string):Observable<ProductInterface>{
    return this._http.get<ProductInterface>(EndPoints.GET_PRODUCT_BY_ID+id)
  }

  postProduct(data : NewProduct):Observable<any>{
    return this._http.post(EndPoints.CREATE_PRODUCT, data)
  }

  putProduct(id: string, data: UpdateProduct):Observable<any>{
    return this._http.put(EndPoints.GET_PRODUCT_BY_ID+id, data)
  }

  deleteProduct(id : string):Observable<any>{
    return this._http.delete(EndPoints.GET_PRODUCT_BY_ID+id)
  }

  getAllCategories() : Observable<CategoryInterface[]>{
    return this._http.get<CategoryInterface[]>(EndPoints.GET_ALL_CATEGORIES)
  }

}
