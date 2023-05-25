import internal from "stream";

class Bug {
  id: number;
  titulo: string;
  cuerpo: string;
  encargado: string;
  estado: number;
  likes: number;
  constructor(
    id = 0,
    titulo = "vacio",
    cuerpo = "vacio",
    encargado = "vacio",
    estado = 0,
    likes = 0
  ) {
    this.id = id;
    this.cuerpo = cuerpo;
    this.titulo = titulo;
    this.encargado = encargado;
    this.estado = estado;
    this.likes = likes;
  }
}

export default Bug;
