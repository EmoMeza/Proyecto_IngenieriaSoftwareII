import * as React from 'react';
import {Card,Container,Button} from 'react-bootstrap';
import { useState, useEffect } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

interface IReportesDev {
    
}

type reporte = {
  id: number;
  titulo:string;
  descripcion:string;
  likes:number;
  fecha:string;
  id_estado: number;
  id_prioridad: number;
  id_producto: number;
}

// Tengo que hacer que esta wea sea async

const getData = () => {
  const [datosReporte, setDatosReporte] = useState([]);
  const [datosProducto, setDatosProductos] = useState([]);
  const [datosEstado, setDatosEstados] = useState([]);

  const fetchUserData = () => {
    fetch("http://127.0.0.1:5000/dev/reportes/?id_dev=5")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDatosReporte(data);
      });

    fetch("http://127.0.0.1:5000/products/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDatosProductos(data);
      });

    fetch("http://127.0.0.1:5000/reports/estados/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDatosEstados(data);
      });
  };

  useEffect(() => {
    // Configurar la consulta periódica cada X segundos
    const interval = setInterval(() => {
      fetchUserData();
    }, 5000); // Consulta cada 5 segundos (ajusta este valor según tus necesidades)

    // Limpiar el intervalo cuando el componente se desmonte
    return () => {
      clearInterval(interval);
    };
  }, []);

  return [datosReporte, datosProducto, datosEstado];
};


const ReportesDev: React.FunctionComponent<IReportesDev> = (props) => {

  const [datosReporte, datosProducto, datosEstado] = getData();

  const reports = datosReporte.map((reports:reporte) => {
    return {
      titulo:<Button href={"/VerReporte/" + reports.id} variant="link">{reports.titulo}</Button>, 
      estado:datosEstado[reports.id_estado].nombre.toUpperCase(),
      likes:reports.likes,
      fecha:reports.fecha,
      producto:datosProducto[reports.id_producto].nombre
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
      {
        label: 'Producto',
        field: 'producto',
        sort: 'asc'
      }
    ],
    rows: reports
  };
  

  return (
    <Container>
          <Card>
            <Card.Body>
              <Card.Title className="text-black">
                Reportes asignados actualmente
              </Card.Title>
              <MDBTable scrollY>
                <MDBTableHead columns={data.columns} />
                <MDBTableBody rows={data.rows} />
              </MDBTable>
            </Card.Body>
          </Card>
    </Container>
    
  );
};

export default ReportesDev;
