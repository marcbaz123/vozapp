export interface Portavoz{
nombre : string;
correo: string;
descripcion: string;
edad: number | null | undefined;
foto: string;
id: string;
fecha: Date;
celular: string;
}
export interface Usuario{
    uid: string;
    correo: string;
    contra: string;
    nombre: string;
    celular: string;
    referencia: string;
    foto: string;
   
}