import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { DatePipe } from '@angular/common'
import { UserInterface } from '../models/user-interface';
import { isNullOrUndefined } from 'util';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,private datePipe: DatePipe, private router: Router) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  InsertProduct(nombre: string,detalle: string,precio: number,fecha:Date,foto: string,meGusta: number,noMeGusta: number,activo: number,usuario: number,categoria: number) {

    const url = "http://localhost:3000/addProduct"
    return this.http.post(
      url,
      {
        "PRODUCTO_NOMBRE": nombre,
        "PRODUCTO_DETALLE" : detalle,
        "PRODUCTO_PRECIO": precio,
        "PRODUCTO_FECHA":this.datePipe.transform(fecha, 'yyyy/MM/dd'),
        "PRODUCTO_FOTO":foto,
        "PRODUCTO_ME_GUSTA":meGusta,
        "PRODUCTO_NO_ME_GUSTA":noMeGusta,
        "PRODUCTO_ACTIVO":activo,
        "PRODUCTO_USUARIO_ID":usuario,
        "PRODUCTO_CATEGORIA_ID":categoria,
        
      },
      { headers: this.headers }
    ).pipe(map(data => data));

  }

  getCategories(){
    const url = "http://localhost:3000/getCategories"
    return this.http.get(
      url,
      { headers: this.headers }
    ).pipe(map(data => data));

  }

  GetProducts() {
    const url = "http://localhost:3000/getProducts";
    return this.http.get(url,
      { headers: this.headers }
      ).pipe(map(data => data));
  }
getOneProduct(id:number){
  const url = "http://localhost:3000/getOneProduct"
  return this.http.post(
    url,
    {
      "PRODUCTO_ID": id,
      
    },
    { headers: this.headers }
  ).pipe(map(data => data));
}

insertCarrito(idUsuario:number,subtotal:number,cantidad:number,idProducto:number) {

  const url = "http://localhost:3000/insertCarrito"
  return this.http.post(
    url,
    {
      "USUARIO_ID": idUsuario,
      "DETALLE_CARRITO_SUBTOTAL": subtotal,
      "DETALLE_CARRITO_CANTIDAD": cantidad,
      "PRODUCTO_ID": idProducto
      
    },
    { headers: this.headers }
  ).pipe(map(data => data));

}

getCarrito(idUsuario:number) {

  const url = "http://localhost:3000/getCarrito"
  return this.http.post(
    url,
    {
      "USUARIO_ID": idUsuario
      
    },
    { headers: this.headers }
  ).pipe(map(data => data));

}

deleteDetalle(idDetalle:number,total:number,idCarrito:number) {

  const url = "http://localhost:3000/deleteDetalle"
  return this.http.post(
    url,
    {
      "DETALLE_CARRITO_ID": idDetalle,
      "CARRITO_ID":idCarrito,
      "CARRITO_TOTAL":total,
      
    },
    { headers: this.headers }
  ).pipe(map(data => data));

}

insertFactura(productos, nombreFactura, direccionFactura, nitFactura){
  const url = "http://localhost:3000/insertFactura"
  return this.http.post(
    url,
    {
      "PRODUCTOS": productos,
      "NOMBRE_FACTURA":nombreFactura,
      "DIRECCION_FACTURA":direccionFactura,
      "NIT_FACTURA":nitFactura
      
    },
    { headers: this.headers }
  ).pipe(map(data => data));
}

}
