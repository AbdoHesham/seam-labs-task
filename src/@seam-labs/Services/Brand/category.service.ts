import { Injectable } from '@angular/core';
import { productController } from 'src/@seam-labs/APIs/productController';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private HttpService: HttpClient) { }
  getAllCategories() {
    return this.HttpService.get(productController.getAllCategories);
  }
  getAllProducts() {
    return this.HttpService.get(productController.getAllProducts);
  }
  
  // GetBrandList(model: any) {
  //   return this.HttpService.post(BrandController.GetBrandList, model);
  // }

}
