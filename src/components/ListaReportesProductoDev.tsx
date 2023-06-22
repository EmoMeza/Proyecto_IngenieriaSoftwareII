import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import Bug from "../components/Bug";
import CustomCard from "../components/CustomCard";
import { Card, Container, Button } from 'react-bootstrap';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import "./ReportTable.css"

type reporte = {
  descripcion: string;
  fecha: Date;
  id: number;
  id_estado: number;
  id_prioridad: number;
  id_producto: number;
  likes: number;
  titulo: string;
}

const EstadoBug = (id: number) => {
  if (id == 0) {
    return "No Asignado";
  }
  else if (id == 1) {
    return "Pendiente";
  }
  else if (id == 2) {
    return "En proceso";
  }
  else if (id == 3) {
    return "Cerrado";
  }
}

export default function ListaReportesProductoDev(props: { id_product: string, nombre_producto: string }) {
  const [users, setUsers] = useState<reporte[]>([]);

  const fetchUserData = () => {
    fetch("http://127.0.0.1:5000/dev/all-reportes-related-to-products/?id_product=$" + props.id_product + "&id_dev=5")
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
    .map((item: reporte) => {

      return {
        titulo: <Button href={"/VerReporte/" + item.id} variant="link">{item.title}</Button>,
        estado: EstadoBug(item.id_estado).toUpperCase(),
        likes: item.likes,
        fecha: item.date,    
      };

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
        label: 'Estado',
        field: 'estado',
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
    ],
    rows: items
  };
  return (
    <Container className="search-container">
      <Card className="table-bugs-productos">
        <Card.Body>
          <Card.Title className="text-black">
            Reportes de {props.nombre_producto}
          </Card.Title>
          <div style={{ maxHeight: '55vh', overflowY: 'scroll' }}>
            <MDBTable>
              <MDBTableHead columns={data.columns} />
              <MDBTableBody rows={data.rows} />
            </MDBTable>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}