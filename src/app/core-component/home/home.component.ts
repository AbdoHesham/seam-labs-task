import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/@seam-labs/Services/Brand/category.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  Categories: any;
  selectedUsers: any[] = [];
  rating: FormControl | any;
  form: FormGroup;

  pricesFilters = [
    { id: 1, name: 'Price 100 → 300', min:100 , max:300 },
    { id: 2, name: 'Price 200 → 400' , min:200 , max:400},
    { id: 3, name: 'Price 300 → 500', min:300 , max:500 },
    { id: 4, name: 'Price 400 → 600' , min:400 , max:600},
    { id: 5, name: 'Price 500 → 700' , min:500 , max:700},
    { id: 6, name: 'Price 600 → 800' , min:600 , max:800},
  ];
  products: any;
  selectedPrices: any;
  constructor(
    private CategoriesService: CategoriesService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      rating: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts([],[]);
  }
  getAllProducts(categories?: string[] , selectedPrices?:any[]) {
    // const Roles =[]
    this.CategoriesService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response;

        // if (categories?.length !== 0) {
        //   console.log(categories);

        //   this.products = response.filter((product: any) => {
        //     // Check if the product belongs to the selected category
        //     // return product.category === categories;
        //     return categories?.some(
        //       (categoryName: any) => product.category === categoryName
        //     );
        //   });
        // } 
        if (selectedPrices?.length !== 0) {

          this.products = response.filter((product:any) => {
            return selectedPrices?.some((priceRange:any) => {
              return product.price >= priceRange[0] && product.price <= priceRange[1];
            });
          });
        } 

      },
      (error: Error) => {
        // this.alertifyService.error('technical error ');
      }
    );
  }
  getAllCategories() {
    // const Roles =[]
    this.CategoriesService.getAllCategories().subscribe(
      (response: any) => {
        this.Categories = response;
      },
      (error: Error) => {
        // this.alertifyService.error('technical error ');
      }
    );
  }
  sendNotificationForSpecificUsers(event: any, id: any) {
    if (event.checked == true) {
      if (!this.selectedUsers.includes(id)) {
        this.selectedUsers.push(id);
      }
    } else {
      this.selectedUsers = this.selectedUsers.filter((f) => f !== id);
    }
  }
  filterprices(event: any, id: any) {
    if (event.checked == true) {
      if (!this.selectedPrices.includes(id)) {
        this.selectedPrices.push(id);
      }
    } else {
      this.selectedPrices = this.selectedPrices.filter((f:any) => f !== id);
    }
  }
}
