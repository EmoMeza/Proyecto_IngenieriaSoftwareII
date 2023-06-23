import internal from "stream";

class Bug {
  id: number;
  id_prioridad: number;
  titulo: string;
  cuerpo: string;
  encargado: string;
  estado: string;
  likes: number;
  constructor(
    id = 0,
    id_prioridad=0,
    titulo = "vacio",
    cuerpo = "vacio",
    encargado = "vacio",
    estado = "Abierto",
    likes = 0
  ) {
    this.id = id;
    this.id_prioridad=id_prioridad;
    this.cuerpo = cuerpo;
    this.titulo = titulo;
    this.encargado = encargado;
    this.estado = estado;
    this.likes = likes;
  }
}

export default Bug;
