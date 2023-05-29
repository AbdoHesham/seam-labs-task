import { ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';
import { CategoriesService } from 'src/@seam-labs/Services/Brand/category.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';

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
  isEmpty: boolean = false;
  pricesFilters = [
    { id: 1, name: 'Price 100 → 300', min: 100, max: 300 },
    { id: 2, name: 'Price 200 → 400', min: 200, max: 400 },
    { id: 3, name: 'Price 300 → 500', min: 300, max: 500 },
    { id: 4, name: 'Price 400 → 600', min: 400, max: 600 },
    { id: 5, name: 'Price 500 → 700', min: 500, max: 700 },
    { id: 6, name: 'Price 600 → 800', min: 600, max: 800 },
  ];
  products: any = [];
  selectedPrices: any[] = [];
  altSelectedPrices: any[] = [];
  searchKey = '';
  constructor(
    private CategoriesService: CategoriesService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,

    
  ) {
    this.form = this.fb.group({
      rating: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getAllCategories();
    this.CategoriesService.searchWord.subscribe((searchWord: string) => {
      this.searchKey = searchWord;
      this.getAllProducts([], [], this.searchKey);
    });
  }
  getAllProducts(
    categories?: string[],
    selectedPrices?: any[],
    searchInput?: string
  ) {
    // const Roles =[]
    this.CategoriesService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response;
        // check for categories only
        if (categories?.length !== 0) {
          this.products = response.filter((product: any) => {
            // Check if the product belongs to the selected category
            return categories?.some(
              (categoryName: any) => product.category === categoryName
            );
          });
        }
        // check for selectedPrices only
        if (selectedPrices?.length !== 0) {
          this.products = response.filter((product: any) => {
            return selectedPrices?.some(
              (priceRange: { min: number; max: number }) => {
                return (
                  product.price >= priceRange.min &&
                  product.price <= priceRange.max
                );
              }
            );
          });
        }
        // check for selectedPrices and categories

        if (categories?.length !== 0 && selectedPrices?.length !== 0) {
          this.products = this.products.filter((product: any) => {
            return (
              categories?.includes(product.category) &&
              selectedPrices?.some(
                (priceRange: { min: number; max: number }) => {
                  return (
                    product.price >= priceRange.min &&
                    product.price <= priceRange.max
                  );
                }
              )
            );
          });
        }

        if (searchInput !== '') {
          console.log(searchInput);
          // setTimeout(()=>{

          this.products = this.products.filter((product: any) => {
            return product.title
              .toLowerCase()
              .includes(searchInput?.toLowerCase());
          });
          // },100)
          if (this.products.length == 0) this.isEmpty = true;
          else this.isEmpty = false;
          console.log(this.products.length , this.isEmpty);
          // this.cd.detectChanges();
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
  filterprices(event: any, item: any) {
    if (event.checked == true) {
      if (!this.selectedPrices.includes(item.id)) {
        this.selectedPrices.push(item);
      }
    } else {
      this.selectedPrices = this.selectedPrices.filter(
        (f: any) => f.id !== item.id
      );
    }
    this.altSelectedPrices = this.selectedPrices;
    this.altSelectedPrices = this.altSelectedPrices.map((p: any) => {
      return { min: p.min, max: p.max };
    });
    console.log(this.altSelectedPrices);
  }
  productById(id:number){
    this.router.navigateByUrl(`/product-details/${id}`)
  }
}
