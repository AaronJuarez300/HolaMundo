import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CRUDComponent } from  "./components/crud/crud.component";
import { HomeComponent } from  "./components/home/home.component";
import { LoginComponent } from  "./components/login/login.component";
import {CreateproductComponent} from "./components/createproduct/createproduct.component";
import {EdituserComponent} from "./components/edituser/edituser.component";
import {DetalleproductoComponent} from "./components/detalleproducto/detalleproducto.component";
import {CarritoComponent} from "./components/carrito/carrito.component";
import { AuthGuard } from "./guards/auth.guard";
const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'crud',
    component: CRUDComponent,
    
  },
  {
    path: 'login',
    component:LoginComponent
   
  },
  {
    path: 'createProduct',
    component:CreateproductComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'editarPerfil',
    component:EdituserComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'detalleProducto/:id',
    component:DetalleproductoComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'carrito',
    component:CarritoComponent,
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
