import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreComponentRoutingModule } from './core-component-routing.module';
import { CoreComponentComponent } from './core-component.component';
import { HeaderComponent } from '../common-component/header/header.component';
import { LayoutComponent } from '../common-component/layout/layout.component';
import { sharedModule } from '../shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BarRatingModule } from 'ngx-bar-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../common-component/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    CoreComponentComponent,
    LayoutComponent,
    HeaderComponent,
    HomeComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    CoreComponentRoutingModule,
    sharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
      isolate: false,
    }),
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    NgbModule,
    NgbCollapseModule,
    MatBadgeModule,
    MatCheckboxModule,
    BarRatingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatSnackBarModule
  ],
  exports: [CoreComponentComponent, HeaderComponent, LayoutComponent],
  providers: [],
})
export class CoreComponentModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
