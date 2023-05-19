class Comment {
    contenido: string;
    date: string;
    id: string;
    constructor(
      contenido = "vacio",
      date = "vacio",
      id = "vacio"
    ) {
      this.contenido = contenido;
      this.date = date;
      this.id = id;
    }
  }
  
  export default Comment;
  