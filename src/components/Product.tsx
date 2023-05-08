class Product {
  nombre: string;
  id: number;
  id_encargado: number;
  constructor(
    nombre = "vacio",
    id = -1,
    id_encargado = -1,
  ) {
    this.nombre = nombre;
    this.id = id;
    this.id_encargado = id_encargado;
  }
}

export default Product;
