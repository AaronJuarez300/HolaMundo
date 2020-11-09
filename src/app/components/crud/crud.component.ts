import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import demodata from './assets/demo.json';
import {  UserService } from '../../services/user.service';
import { UserInterface } from "../../models/user-interface";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent implements OnInit {
  //Cambiar imagen preview
  public imagePath;
  imgURL: any = "https://t4.ftcdn.net/jpg/01/19/32/93/240_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg";
  public message: string;

  constructor(public crudService: UserService,private http: HttpClient){
    
  }
  //Pais
  selectedIndustry: string ="";
  //
  nombre: string="";
  apellido: string ="";
  password: string ="";
  confirmarPassword: string="";
  email: string="";
  date: Date = new Date();
  Usuarios: UserInterface[] = [];
  //arreglo paises
  industries = demodata;
  //this.selectedIndustry

  uploadedFiles: Array < File > ;
  ngOnInit(): void {
  }

  async addUser(){
   if(this.nombre==="" || this.apellido===""|| this.password==="" ||this.confirmarPassword ===""||this.email===""||this.selectedIndustry===""){
      alert("Debe llenar todos los campos");
   }else if (this.password!=this.confirmarPassword) {
      alert("La contrasena no coincide con la confirmacion");
   }else if (this.uploadedFiles!=undefined){
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    var asyncResult = await this.http.post('http://localhost:3000/upload', formData).toPromise()
    /*.subscribe((response) => {
         console.log('response received is ', response);
         retorno= response;
         return retorno;
    })*/
    
   
    this.crudService.InsertUser(this.nombre,this.apellido,this.password,this.email,this.selectedIndustry,this.date,asyncResult['msg'],10000,2,0)
    .subscribe((res: UserInterface[]) => {
      console.log(res);
      if(res['msg']){
        alert("Error, ya existe una cuenta con ese correo");
      }
    this.Usuarios = res;
    this.nombre="";
    this.apellido="";
    this.password = "";
    this.confirmarPassword="";
    this.email="";
    this.date=new Date();
    this.selectedIndustry="";
    this.imgURL = "https://t4.ftcdn.net/jpg/01/19/32/93/240_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg";
    })

   }else{

    this.crudService.InsertUser(this.nombre,this.apellido,this.password,this.email,this.selectedIndustry,this.date,"defaultUser.jpg",10000,2,0)
    .subscribe((res: UserInterface[]) => {
      console.log(res);
      if(res['msg']){
        alert("Error, ya existe una cuenta con ese correo");
      }
    this.Usuarios = res;
    this.nombre="";
    this.apellido="";
    this.password = "";
    this.confirmarPassword="";
    this.email="";
    this.date=new Date();
    this.selectedIndustry="";
    this.imgURL = "https://t4.ftcdn.net/jpg/01/19/32/93/240_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg";
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
 
    var reader = new FileReader();
    this.imagePath = element.target.files;
    reader.readAsDataURL(element.target.files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
 
  }
  async upload(){
    var retorno;
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    var asyncResult = await this.http.post('http://localhost:3000/upload', formData).toPromise()
    /*.subscribe((response) => {
         console.log('response received is ', response);
         retorno= response;
         return retorno;
    })*/
    console.log('response received is ', asyncResult);
    
  }
}
