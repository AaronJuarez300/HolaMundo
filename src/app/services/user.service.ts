import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { DatePipe } from '@angular/common'
import { UserInterface } from '../models/user-interface';
import { isNullOrUndefined } from 'util';
import { Router } from "@angular/router";
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private datePipe: DatePipe, private router: Router) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  InsertUser(nombre: string,apellido: string,contrasena: string,correo:string,pais: string,fecha_nacimiento: Date,foto: string,credito: number,tipo_usuario: number,activo: number) {

    const url = "http://localhost:3000/addUser"
    return this.http.post(
      url,
      {
        "USUARIO_NOMBRE": nombre,
        "USUARIO_APELLIDO": apellido,
        "USUARIO_CORREO":correo,
        "USUARIO_CONTRASENA":contrasena,
        "USUARIO_PAIS":pais,
        "USUARIO_FECHA_NACIMIENTO":this.datePipe.transform(fecha_nacimiento, 'yyyy/MM/dd'),
        "USUARIO_FOTO":foto,
        "USUARIO_CREDITO":credito,
        "USUARIO_TIPO_USUARIO_ID":tipo_usuario,
        "USUARIO_ACTIVO":activo
        
      },
      { headers: this.headers }
    ).pipe(map(data => data));

  }

  Login(email:string, password:string) {
    const url = "http://localhost:3000/login";

    return this.http.post(url,
      {
        "USUARIO_CORREO":email,
        "USUARIO_CONTRASENA":password
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }
  //obtener Un usuario por id
  getOneUser(id:number) {
    const url = "http://localhost:3000/getOneUser";
    return this.http.post(url,
      {
        "USUARIO_ID":id
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }

  //obtener Un usuario por id
  updateUser(id:number, nombre:string, apellido:string,correo:string, pais:string,fecha:Date,foto:string) {
    const url = "http://localhost:3000/updateUser";
    return this.http.post(url,
      {
        "USUARIO_ID": id,
        "USUARIO_NOMBRE": nombre,
        "USUARIO_APELLIDO": apellido,
        "USUARIO_CORREO": correo,
        "USUARIO_PAIS": pais,
        "USUARIO_FECHA_NACIMIENTO": this.datePipe.transform(fecha, 'yyyy/MM/dd'),
        "USUARIO_FOTO": foto
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }

  //TODO: SET CURRENT USER
  setCurrentUser(user: UserInterface) {
    let user_string = JSON.stringify(user);
    localStorage.setItem('UsuarioLogueado', user_string);
  }
  //TODO: GET CURRENT USER
  getCurrentUser() {
    let userCurrent = localStorage.getItem('UsuarioLogueado');
    if (!isNullOrUndefined(userCurrent)) {
      let user_json = JSON.parse(userCurrent);
      return user_json;
    } else {
      return null;
    }
  }
  
  logout() {
    localStorage.removeItem("UsuarioLogueado");
    this.router.navigate(['/login']);
  }

}
