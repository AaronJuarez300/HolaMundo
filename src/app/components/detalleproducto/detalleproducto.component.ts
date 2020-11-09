import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { ProductService } from "../../services/product.service";
import { ProductInterface } from "../../models/product-interface";

@Component({
  selector: 'app-detalleproducto',
  templateUrl: './detalleproducto.component.html',
  styleUrls: ['./detalleproducto.component.css']
})
export class DetalleproductoComponent implements OnInit {
  idProducto:number;
  productoNombre:string;
  detalle:string;
  precio:number;
  fecha:string;
  idUsuario:number;
  subtotal:number;
  cantidad:number;
  products;
  imgURL: any ;
  constructor(public userService: UserService, public router: Router,private route: ActivatedRoute, public productService:ProductService) { }

  ngOnInit(): void {
    this.idProducto = Number(this.route.snapshot.paramMap.get("id"));
    this.idUsuario = this.userService.getCurrentUser()['USUARIO_ID'];
    this.productService.getOneProduct(this.idProducto).subscribe((res: ProductInterface[]) => {
      this.products = res;
      this.imgURL = res[0]['PRODUCTO_FOTO'];
      this.productoNombre=res[0]['PRODUCTO_NOMBRE'];
      this.detalle = res[0]['PRODUCTO_DETALLE'];
      this.precio = res[0]['PRODUCTO_PRECIO'];
      this.fecha = res[0]['PRODUCTO_FECHA'];
  
    })
  }

  cerrarSesion() {
    this.userService.logout();
  }

  gotoHome(){
    this.router.navigate(['/']);
  }

  gotoCreateProduct(){
    this.router.navigate(['/createProduct']);
  }

  gotoCarrito(){
    this.router.navigate(['/carrito']);
  }
  
  insertCarrito(){
    this.subtotal = this.cantidad * this.precio;
    this.productService.insertCarrito(this.idUsuario,this.subtotal,this.cantidad,this.idProducto).subscribe((res: ProductInterface[]) => {
      if (res['msg']) {
        alert("Producto Agregado al carrito correctamente!")
        this.router.navigate(['/']);
      }

    })
  }
}
