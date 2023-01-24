import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactListRoutingModule } from './contact-list-routing.module';
import { ContactListComponent } from './contact-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ContactListComponent
  ],
  imports: [
    CommonModule,
    ContactListRoutingModule,
    SharedModule
  ]
})
export class ContactListModule { }
