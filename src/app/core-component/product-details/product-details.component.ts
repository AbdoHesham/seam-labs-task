import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/@seam-labs/Services/Brand/category.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  item: any;

  constructor(
    private _activedRoute: ActivatedRoute,
    private router: Router,
    private CategoriesService: CategoriesService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this._activedRoute.snapshot.params['id'];
    this.getProductById();
  }

  getProductById() {
    this.CategoriesService.getProductById(this.id).subscribe(
      (response: any) => {
        this.item = response;
      },
      (error: Error) => {
        // this.alertifyService.error('technical error ');
      }
    );
  }
  quantity = 1;

  incrementQuantity() {
    // Increment the value of the quantity variable
    this.quantity++;
  }

  decrementQuantity() {
    // Decrement the value of the quantity variable, but not below 1
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  addToCart(item: any) {
    // Check if the item already exists in the cart
    const existingItem = this.CategoriesService.cartItems.find(
      (cartItem: any) => cartItem.id === item.id
    );
    if (existingItem) {
      // If the item already exists, update its quantity and price
      this._snackBar.open('already exist','x');
    } else {
      // If the item doesn't exist, add it to the cart
      this.CategoriesService.cartItems.push(item);
      this._snackBar.open('added susseccfully','x');
    }
    console.log(
      this.CategoriesService.cartItems,
      this.CategoriesService.cartItems.length
    );
    this.CategoriesService.cartCount.next(
      this.CategoriesService.cartItems.length
    );
  }
}
