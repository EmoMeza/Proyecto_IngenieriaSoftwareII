import * as React from 'react';
import {Card,Container,Button} from 'react-bootstrap';
import { useState, useEffect } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import AsignacionButton from './AsignacionButton';

interface IReportes_sin_AsignarProps {
    
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


const id_product=2;

const getProducts = ()=> {
  const [datos, setDatos] = useState([]);

  const fetchData = () => {
    fetch("http://127.0.0.1:5000/products/get/reports?id_product=2")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDatos(data);
      });
  };

  useEffect(() => {
    // Configurar la consulta periódica cada X segundos
    const interval = setInterval(() => {
      fetchData();
    }, 5000); // Consulta cada 5 segundos (ajusta este valor según tus necesidades)

    // Limpiar el intervalo cuando el componente se desmonte
    return () => {
      clearInterval(interval);
    };
  }, []);

  return datos;
}

const getData = () => {
  const [datos, setDatos] = useState([]);

  const fetchData = () => {
    fetch("http://127.0.0.1:5000/products/get/reports?id_product="+id_product)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDatos(data);
      });
  };

  useEffect(() => {
    // Configurar la consulta periódica cada X segundos
    const interval = setInterval(() => {
      fetchData();
    }, 5000); // Consulta cada 5 segundos (ajusta este valor según tus necesidades)

    // Limpiar el intervalo cuando el componente se desmonte
    return () => {
      clearInterval(interval);
    };
  }, []);

  const reports = datos.map((reports:reporte) => {
    return {
      titulo:<Button href={"/VerReporte/"+reports.id} variant="link">{reports.titulo}</Button>, 
      likes:reports.likes,
      fecha:reports.fecha,
      asignacion:<AsignacionButton id_report ={reports.id}  ></AsignacionButton>
    }
  });


  return reports;
};


const Reportes_sin_Asignar: React.FunctionComponent<IReportes_sin_AsignarProps> = (props) => {

  const reports=getData();

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
        }
    ],
    rows: reports
  };
  


  return (
    <Container>
          <Card>
            <Card.Body>
              <Card.Title className="text-black">
                Reportes Sin Asignar
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

export default Reportes_sin_Asignar;
