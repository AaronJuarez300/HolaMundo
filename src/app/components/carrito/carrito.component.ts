import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { ProductService } from "../../services/product.service";
import { ProductInterface } from "../../models/product-interface";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
  
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  idUsuario:number;
  detalleCarritos;
  total:number;
  creditos:number;
  nombreFactura:string;
  direccionFactura:string;
  nitFactura:string;
  title = 'appBootstrap';
  closeResult: string;
  constructor(private modalService: NgbModal,public userService: UserService, public router: Router, public productService:ProductService) { }

  ngOnInit(): void {
    let usuarioLogueado = this.userService.getCurrentUser();
    this.idUsuario = usuarioLogueado['USUARIO_ID'];
    this.productService.getCarrito(this.idUsuario).subscribe((res: ProductInterface[]) => {
      console.log(res);
      this.detalleCarritos = res;
      this.total = res[0]['CARRITO_TOTAL'];
      this.creditos = res[0]['USUARIO_CREDITO'];
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

  deleteRow(index, idDetalle,subtotal,idCarrito) {  
    this.total = this.total-subtotal
    this.productService.deleteDetalle(idDetalle,this.total,idCarrito).subscribe((res: ProductInterface[]) => {
      if(res['msg']){
        this.detalleCarritos.splice(index, 1);
        alert("Producto eliminado del carrito correctamente!"); 
      }
    })   
  }
  
  comprar(content){
    if (this.creditos>=this.total){
      const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        
        let datosFactura =result;
        this.nombreFactura = datosFactura['NOMBRE_FACTURA'];
        this.direccionFactura = datosFactura['DIRECCION_FACTURA'];
        this.nitFactura = datosFactura['NIT_FACTURA'];
        this.productService.insertFactura(this.detalleCarritos,this.nombreFactura,this.direccionFactura,this.nitFactura).subscribe((res: ProductInterface[]) => {
          if(res['msg']){
        
          }
        }) 
       
      }, (reason) => {
  
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.direccionFactura=content.txtDireccion
        console.log('direccion '+this.direccionFactura);
      });
      
      console.log(content);
     /* this.productService.insertFactura(this.detalleCarritos).subscribe((res: ProductInterface[]) => {
        if(res['msg']){
      
        }
      })  */ 
    }else{
      alert("Creditos insuficientes para realizar la compra");
    }
  }

enviarCompra(nombreFactura, direccionFactura, nitFactura){
  console.log(nombreFactura,direccionFactura,nitFactura);
  this.productService.insertFactura(this.detalleCarritos,this.nombreFactura,this.direccionFactura,this.nitFactura).subscribe((res: ProductInterface[]) => {
    if(res['msg']){
  
    }
  }) 
}

  

  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';

    } else {

      return  `with: ${reason}`;

    }

  }
}

