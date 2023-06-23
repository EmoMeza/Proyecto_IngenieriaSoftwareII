import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Card, Container, Button } from 'react-bootstrap';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import "../routes/App.css"
import "./ReportTable.css"
import LikeButton from "./LikeButton";

type reporte = {
  date: Date;
  description: string;
  id_estado: number;
  id: number;
  id_prioridad:number;
  id_producto: number;
  likes: number;
  title: string;
}
type prioridad = {
  id: number;
  nombre: string;
};
type EstadoDictionary = { [id: number]: string };

interface ReportTableProps {
  Items: reporte[]
  id_product: number;
  estados: EstadoDictionary;
}

const getPrioridades = (): prioridad[] => {
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

export default function ReportTable({ Items, id_product, estados}: ReportTableProps) {
  const prioridades = getPrioridades();


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

  const reports = Items.map((report: reporte) => {
    return {
      titulo: <Button href={"/VerReporte/" + report.id} variant="link">{report.title}</Button>,
      prioridad: getPrioridadNombre(report.id_prioridad),
      fecha: report.date,
      estado: report.id_estado,
      likes: report.likes,
      like: <LikeButton id_bug={report.id} />,
      id_producto: report.id_producto
    }
  });
  
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
        label: 'Fecha',
        field: 'fecha',
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
        label: '',
        field: 'like',
        sort: 'asc'
      }
    ],
    rows: reports
  };

  


  return (
      <ul>
        <Container className="search-container">
          <Card>
            <Card.Body>
              <Card.Title className="text-black">Reportes</Card.Title>
              <div style={{ maxHeight: '55vh', overflowY: 'scroll' }}>
                <MDBTable>
                  <MDBTableHead columns={data.columns} />
                  <MDBTableBody>
                    {data.rows.filter((row) => row.id_producto === id_product).map((row, index) => (
                      <tr key={index} data-custom="hidden data">
                        <td>{row.titulo}</td>
                        <td>{row.prioridad}</td>
                        <td>{row.fecha}</td>
                        <td>{estados[row.estado]}</td>
                        <td>{row.likes}</td>
                        <td>{row.like}</td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </ul>
  );
}
