import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import {  ProductService } from '../../services/product.service';
import { Router } from "@angular/router";
import { CategoryInterface } from "../../models/category-interface";
import { ProductInterface } from "../../models/product-interface";
import { isNullOrUndefined } from 'util';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {
   //Cambiar imagen preview
   public imagePath;
   imgURL: any = "http://localhost:3000/gusto.svg";
   public message: string;
   uploadedFiles: Array < File > ;
   //Combobox
   categories;
   
  //Variables Campos de Texto
  nombre:string="";
  detalle:string="";
  precio:number=0;
  selectedCategory:number=0;
  idUsuario:number;

  constructor(public userService: UserService,public router: Router, public productService:ProductService,private http: HttpClient) { }

  ngOnInit(): void {
    this.productService.getCategories()
    .subscribe((res: CategoryInterface[]) => {
      console.log(res);
      this.categories=res;
   
    })
    let usuarioLogueado = this.userService.getCurrentUser();
    this.idUsuario = usuarioLogueado['USUARIO_ID'];
  }

  addImage(element){
    
    this.uploadedFiles = element.target.files; // outputs the first file
    console.log(element.target.files)
    if (element.length === 0)
      return;
 
    var mimeType = element.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      alert( this.message);
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = element.target.files;
    reader.readAsDataURL(element.target.files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
 
  }

  cerrarSesion() {
    this.userService.logout();
  }

  gotoHome(){
    this.router.navigate(['/']);
  }

  gotoEditarPerfil(){
    this.router.navigate(['/editarPerfil']);
  }

  gotoCarrito(){
    this.router.navigate(['/carrito']);
  }
    
  async crearProducto(){
  
    if(this.nombre==""||this.detalle==""||this.precio==0||this.selectedCategory==0||isNullOrUndefined(this.uploadedFiles)){
      alert("debe llenar todos los campos y seleccionar una imagen de su producto");
    }else{
      let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    var asyncResult = await this.http.post('http://localhost:3000/upload', formData).toPromise()
    this.productService.InsertProduct(this.nombre,this.detalle,this.precio,new Date(),asyncResult['msg'],0,0,1,this.idUsuario,this.selectedCategory)
    .subscribe((res: ProductInterface[]) => {
      
      if(res['msg']){
        alert("Producto Creado Correctamente");
        this.nombre="";
        this.detalle="";
        this.precio=0;
        this.selectedCategory=0;
        this.imgURL = "https://t4.ftcdn.net/jpg/01/19/32/93/240_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg";
      }

    })
    this.router.navigate(['/']);
    }
  }
}
