import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";
import { ProductInterface } from "../../models/product-interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  idProduct:number;
  /*nombre:string;
  detalle:string;
  precio:number;
  fecha:string;
  foto:string;
  meGusta:number;
  noMeGusta:number;
  productoUsuarioId:number;
  productoCategoriaId:number;
  descripcion:string;
  productoUsuarioNombre:string;
  productoUsuarioApellido:string;*/         
            
  constructor(public userService: UserService,public router: Router, public productService:ProductService) { }

  ngOnInit(): void {
    this.productService.GetProducts().subscribe((res: ProductInterface[]) => {
      this.Products = res;
      console.log(this.Products);
    })
  }
  Products

  cerrarSesion() {
    this.userService.logout();
  }

  gotoCreateProduct(){
    this.router.navigate(['/createProduct']);
  }

  gotoEditarPerfil(){
    this.router.navigate(['/editarPerfil']);
  }

  gotoDetalles(id:number){
    this.idProduct=id;
    this.router.navigate(['/detalleProducto',this.idProduct]);
  }
  
  gotoCarrito(){
    this.router.navigate(['/carrito']);
  }
}
