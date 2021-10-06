export interface Electrolinera {
    id?: string;
    usuario: string,
    name: string;
    direccion: string;
    referencia: string;
    tipoconector: string;
    numeroconectores: string;
    lunes: string;
    martes: string;
    miercoles: string;
    jueves: string;
    viernes: string;
    sabado: string;
    domingo: string;
    formaspago: string;
    latitud: number;
    longitud: number;
    estado : string;
    imagen: string;
    sector: string;
}
export interface ElectrolineraDatos {
    id?: string;
    usuario: string,
    name: string;
    direccion: string;
    referencia: string;
    imagen: string;
}
export interface ElectrolineraUbicacion {
    id?: string;
    name: string;
    latitud: number;
    longitud: number;
    estado: string;
}
