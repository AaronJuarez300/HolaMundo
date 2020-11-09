export interface ProductInterface {
    id:number,
    nombre: string,
    detalle: string,
    precio: number,
    fecha:Date,
    foto: string,
    meGusta: number,
    noMeGusta: number,
    activo: number,
    idUsuario: number,
    idCategoria: number,
    categoriaDescripcion:string,
    usuarioNombre:string,
    usuarioApellido:string
}