import * as React from 'react';
import {Card,Container,Button} from 'react-bootstrap';
import { useState, useEffect } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import ReasignacionButton from './ReasignacionButton';

interface IReasignacionProps {
    
}

type reporte = {
    id_report: number;
    id_developer:number;
    date:string;
    motivo:string;
}

type infoDev = {
    id: number;
    nombre:string;
    email:string;
    id_rol:number;
}

const getData = () => {
  const [datos, setUsers] = useState([]);

  const fetchUserData = () => {
    fetch("http://127.0.0.1:5000/reasignacion/get/all/product/?id_product=2")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return datos;
};



const getInfoDev = (id_dev:number) => {  /* 'id': developer.id, 'nombre': developer.nombre, 'email': developer.email, 'id_rol': developer.id_rol */
  const [datos, setUsers] = useState([]);

  const fetchUserData = () => {
    fetch("http://127.0.0.1:5000/dev/info/?id_dev="+id_dev)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const desarollador = datos.nombre;
  
  return desarollador;
};


const Reasignacion: React.FunctionComponent<IReasignacionProps> = (props) => {

  const datos=getData();
  const datos_dev=getInfoDev(2);

  const reports = datos.map((reports:reporte) => {
    
    

    return {
      titulo:<Button href="/VerReporte" variant="link">Titulo</Button>, 
      desarollador: reports.id_developer,
      asignacion:<ReasignacionButton id_report ={reports.id_report} id_developer={reports.id_developer} date={reports.date} motivo={reports.motivo} ></ReasignacionButton>
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
        label: 'Desarollador Asignado',
        field: 'desarollador',
        sort: 'asc'
      },
      {
        label: 'Reasignacion',
        field: 'reasignacion',
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
                Reasignacion de Reportes
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

export default Reasignacion;
