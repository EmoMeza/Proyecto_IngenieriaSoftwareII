import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import "./ReportTable.css"
import { Card, Container, Button } from 'react-bootstrap';
import "./Prioridades.css";
type reporte = {
  descripcion: string;
  date: Date;
  id: number;
  id_estado: number;
  id_prioridad: number;
  id_producto: number;
  likes: number;
  title: string;
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
  else{
    return "No Asignado";
  }
}
type prioridad = {
  id: number;
  nombre: string;
};

const getData = (): prioridad[] => {
  const [prioridades, setPrioridades] = useState<prioridad[]>([]);

  useEffect(() => {
    const fetchPrioridades = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/reports/prioridad/all');
        if (response.ok) {
          const data = await response.json();
          setPrioridades(data);
        } else {
          console.error('Failed to fetch prioridades');
        }
      } catch (error) {
        console.error('An error occurred while fetching prioridades:', error);
      }
    };

    fetchPrioridades();
  }, []); // Empty dependency array to run the effect only once

  return prioridades;
};

export default function ListaReportesProductoDev(props: { id_product: string, nombre_producto: string }) {
  const [users, setUsers] = useState<reporte[]>([]);
  const prioridades = getData();


  const getPrioridadNombre =(id:number) =>{
    const  prio = prioridades.find((item: prioridad) => item.id === id);
    if (!prio) {
      return <h5 className="prioridadCero">NO ASIGNADO</h5>;
    } else if (prio.id === 0) {
      return <h5 className="prioridadCero">{prio.nombre.toUpperCase()}</h5>;
    } else if (prio.id === 1) {
      return <h5 className="prioridadUno">{prio.nombre.toUpperCase()}</h5>;
    } else if (prio.id === 2) {
      return <h5 className="prioridadDos">{prio.nombre.toUpperCase()}</h5>;
    } else if (prio.id === 3) {
      return <h5 className="prioridadTres">{prio.nombre.toUpperCase()}</h5>;
    } else {
      return <h5 className="prioridadCero">NO ASIGNADO</h5>;
    }
  };
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
        prioridad: getPrioridadNombre(item.id_prioridad),
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
        label: 'Prioridad',
        field: 'prioridad',
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
      }
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