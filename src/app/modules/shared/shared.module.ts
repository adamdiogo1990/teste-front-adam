import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/core/token.interceptor';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    LoadingComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    LoadingComponent,
    ErrorComponent
  ],
  providers: [
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
