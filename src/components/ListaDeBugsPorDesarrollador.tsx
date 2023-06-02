import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import Bug from "../components/Bug";
import CustomCard from "../components/CustomCard";
import {Card,Container,Button} from 'react-bootstrap';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import TomarBugButton from "../components/TomarBugButton"

type reporte = {
  descripcion:string;
  fecha:Date;
  id: number;
  id_estado: number;
  id_prioridad: number;
  id_producto: number;
  likes:number;
  titulo:string;

 
}
const EstadoBug = (id: number) =>{
  if (id == 0){
    return "No Asignado";
  }
  else if (id == 1){
    return "Pendiente";
  }
  else if (id == 2){
    return "En proceso";
  }
  else if (id==3){
    return "Cerrado";
  }

} 



export default function ListaDeBugsPorDesarrollador(props: { id_product: string, nombre_producto: string }) {
  const [users, setUsers] = useState<reporte[]>([]);

  const fetchUserData = () => {
    fetch("http://127.0.0.1:5000/dev/reportes/?id_dev=5" )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, [props.id_product]); // Add props.id_product as a dependency

  const items = users.filter((report) => report.id_producto.toString() === props.id_product)
  .map((item:reporte) => {
 
      return {titulo: item.titulo,
        likes: item.likes,
        fecha: item.fecha,
        asignacion: item.id_producto,
        estado: EstadoBug(item.id_estado),
        tomarBug: <TomarBugButton id_report ={item.id}  ></TomarBugButton>};
    
    }
  );
  const data = {
    columns: [
      {
        label: 'Titulo',
        field: 'titulo',
        sort: 'asc'
      },
      {
        label: 'Likes',
        field: 'likes',
        sort: 'asc'
      },
      {
        label: 'Fecha',
        field: 'fecha',
        sort: 'asc'
      },
      {
        label: 'Asignacion',
        field: 'asignacion',
        sort: 'asc'
        },
        {
          label: 'Estado',
          field: 'estado',
          sort: 'asc'
          }
          ,
        {
          label: 'Tomar Bug',
          field: 'tomarBug',
          sort: 'asc'
          }
    ],
    rows: items
  };
  return (
    <ul >
      <Card className="table-bugs-productos">
        <Card.Body>
          <Card.Title className="text-black">
            Reportes de {props.nombre_producto}
          </Card.Title>
          <MDBTable scrollY className="table table-xl">
            <MDBTableHead columns={data.columns} />
            <MDBTableBody rows={data.rows} />
          </MDBTable>
        </Card.Body>
      </Card>
    </ul>
  );
}
