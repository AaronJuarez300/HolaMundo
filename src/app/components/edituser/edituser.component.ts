import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import demodata from './assets/demo.json';
import { UserInterface } from "../../models/user-interface";
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  public imagePath;
  imgURL: any ;
  public message: string;
  uploadedFiles: Array < File > ;

  //Pais
  selectedIndustry: string ="";
  //
  nombre: string="";
  apellido: string ="";
  email: string="";
  date: Date = new Date();
  idUsuario:number;
  foto:string;
  Usuarios: UserInterface[] = [];
  //arreglo paises
  industries = demodata;
  constructor(public userService: UserService, public router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    this.idUsuario = this.userService.getCurrentUser()['USUARIO_ID'];
    this.userService.getOneUser(this.idUsuario)
    .subscribe((res: UserInterface[]) => {

      this.nombre=res[0]['USUARIO_NOMBRE'];
      this.apellido=res[0]['USUARIO_APELLIDO'];
      this.email=res[0]['USUARIO_CORREO'];
      this.date = new Date(res[0]['USUARIO_FECHA_NACIMIENTO']);
      this.selectedIndustry = res[0]['USUARIO_PAIS'];
      this.imgURL = res[0]['USUARIO_FOTO'];
      this.foto = res[0]['NOMBRE_FOTO'];
    })
 
  }

  async update(){
    if(isNullOrUndefined(this.uploadedFiles)){
      this.userService.updateUser(this.idUsuario,this.nombre,this.apellido,this.email,this.selectedIndustry,this.date,this.foto).subscribe((res) => {
        if (res['msg']) {
          alert("Datos actualizados correctamente");
          this.router.navigate(['/']);
        } 
      })
    }else{
      let formData = new FormData();
      for (var i = 0; i < this.uploadedFiles.length; i++) {
          formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
      }
      var asyncResult = await this.http.post('http://localhost:3000/upload', formData).toPromise()
      this.userService.updateUser(this.idUsuario,this.nombre,this.apellido,this.email,this.selectedIndustry,this.date,asyncResult['msg']).subscribe((res) => {
        if (res['msg']) {
          alert("Datos actualizados correctamente");
          this.router.navigate(['/']);
        } 
      })
    }
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
  
}
