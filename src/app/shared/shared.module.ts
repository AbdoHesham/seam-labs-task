import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataService } from '../core/core.index';
import { SpinnerInterceptor } from '../core/interceptor/spinner/spinner.interceptor';

import { FormsModule } from '@angular/forms';
import { CustomPaginationModule } from './custom-pagination/custom-pagination.module';

import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations:[],
  imports: [
    HttpClientModule,
    FormsModule,
    CustomPaginationModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    CustomPaginationModule,
  ],
  providers: [
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
})
export class sharedModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
