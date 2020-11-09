import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HolaMundoComponent } from './hola-mundo/hola-mundo.component';
import { CRUDComponent } from './components/crud/crud.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from "@angular/common";
import { MatInputModule} from '@angular/material/input';
import {  HttpClientModule  } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { UserService } from './services/user.service';
import {ProductService} from './services/product.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerPopup } from './components/datepicker-popup/datepicker-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateproductComponent } from './components/createproduct/createproduct.component';
import { EdituserComponent } from './components/edituser/edituser.component';
import { DetalleproductoComponent } from './components/detalleproducto/detalleproducto.component';
import { CarritoComponent } from './components/carrito/carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    HolaMundoComponent,
    CRUDComponent,
    HomeComponent,
    LoginComponent,
    NgbdDatepickerPopup,
    CreateproductComponent,
    EdituserComponent,
    DetalleproductoComponent,
    CarritoComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule
  
  ],
  providers: [DatePipe, UserService,ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
