import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNgModule } from './modules/prime-ng/prime-ng.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginComponent } from './modules/mercadito/login/login.component';
import { DashboardComponent } from './modules/mercadito/components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent],
  imports: [BrowserModule, AppRoutingModule, PrimeNgModule, HttpClientModule],
  providers: [MessageService, ConfirmationService, DialogService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
