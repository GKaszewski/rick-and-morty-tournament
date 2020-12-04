import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { ApiService } from './services/api.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { TableComponent } from './table/table.component';
import { TableElementComponent } from './table-element/table-element.component';
import { LoaderService } from './services/loader.service';
import { InterceptorService } from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    SpinnerComponent,
    TableComponent,
    TableElementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [ApiService, LoaderService, { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
