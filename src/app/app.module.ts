import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNgModule } from './modules/prime-ng/prime-ng.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginComponent } from './modules/mercadito/components/login/login.component';
import { DashboardComponent } from './modules/mercadito/components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNgModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    DialogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
