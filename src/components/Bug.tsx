class Bug {
  titulo: string;
  cuerpo: string;
  encargado: string;
  estado: string;
  constructor(
    titulo = "vacio",
    cuerpo = "vacio",
    encargado = "vacio",
    estado = "Abierto"
  ) {
    this.cuerpo = cuerpo;
    this.titulo = titulo;
    this.encargado = encargado;
    this.estado = estado;
  }
}

export default Bug;
