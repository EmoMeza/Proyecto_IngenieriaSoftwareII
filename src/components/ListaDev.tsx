import * as React from 'react';
import {Card,Container,Button} from 'react-bootstrap';
import { useState, useEffect } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import ListaDevButton from './ListaDevButton';
interface IListaDevProps {

}

type dev = {
  id: number;
  nombre:string;
  email:string;
  num_reportes: string;
}

const useDevData = (url: string) => {
  const [datos, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [url]);

  return datos;
};

const ListaDev: React.FunctionComponent<IListaDevProps> = (props) => {
  const datos = useDevData("http://127.0.0.1:5000/products/get/developers?id_product=2");

  const fetchNumReports = async (devId: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/dev/all/report-product/?id_dev=${devId}&id_product=2`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching num_reports data:", error);
    }
  };

  const fetchDevData = async () => {
    const devs = datos.map(async (dev: dev) => {
      const num_rep = await fetchNumReports(dev.id);

      return {
        nombre: dev.nombre,
        email: dev.email,
        num_reportes: num_rep.total_reports + " ("+ num_rep.product_reports + ")",
        modal: <ListaDevButton id_dev={dev.id} id_producto={2}></ListaDevButton>
      };
    });

    const updatedDevs = await Promise.all(devs);
    return updatedDevs;
  };

  const [devs, setDevs] = useState<dev[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const updatedDevs = await fetchDevData();
      setDevs(updatedDevs);
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [datos]);



  const data = {
    columns: [
      {
        label: 'Nombre',
        field: 'nombre',
        sort: 'asc'
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc'
      },
      {
        label: 'Reportes \n (Producto)',
        field: 'num_reportes',
        sort: 'asc'
      },
      {
        label: 'Reportes Asignados',
        field: 'modal',
        sort: 'asc'
      }
    ],
    rows: devs
  };
  

  return (
    <Container>
          <Card>
            <Card.Body>
              <Card.Title className="text-black">
                Desarrolladores
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

export default ListaDev;
