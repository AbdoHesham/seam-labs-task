import { Injectable } from '@angular/core';
import { productController } from 'src/@seam-labs/APIs/productController';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  searchWord:BehaviorSubject<string> = new BehaviorSubject<string>('')
  cartCount:BehaviorSubject<number> = new BehaviorSubject<number>(0)
  cartItems: { id: number, description: string, price: number, title: number }[] = [];

  constructor(private HttpService: HttpClient) { }
  getAllCategories() {
    return this.HttpService.get(productController.getAllCategories);
  }
  getAllProducts() {
    return this.HttpService.get(productController.getAllProducts);
  }
  getProductById(id:any) {
    return this.HttpService.get(productController.getAllProducts+'/'+id);
  }
  
  // GetBrandList(model: any) {
  //   return this.HttpService.post(BrandController.GetBrandList, model);
  // }

}
