import * as React from 'react';
import {Stack, Card, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import ListaDevButton from './ListaDevButton';
import "./ReportTable.css"

interface IListaDevProps { }

type Dev = {
  id: number;
  nombre: string;
  email: string;
  num_reportes: string;
}

const useDevData = (url: string, id_product: number) => {
  const [datos, setUsers] = useState<Dev[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}?id_product=${id_product}`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();


    return () => {
      fetchData();
    };
  }, [url, id_product]);

  return datos;
};

const ListaDev: React.FunctionComponent<IListaDevProps> = (props) => {
  const [id_product, setId_product] = useState<number>(1);

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setId_product(parseInt(event.target.value, 10));
  };

  const datos = useDevData('http://127.0.0.1:5000/products/get/developers', id_product);

  const fetchNumReports = async (devId: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/dev/all/report-product/?id_dev=${devId}&id_product=${id_product}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching num_reports data:', error);
    }
  };

  const fetchDevData = async () => {
    const devs = datos.map(async (dev: Dev) => {
      const num_rep = await fetchNumReports(dev.id);

      return {
        nombre: dev.nombre,
        email: dev.email,
        num_reportes: num_rep.total_reports + ' (' + num_rep.product_reports + ')',
        modal: <ListaDevButton id_dev={dev.id} id_producto={id_product}></ListaDevButton>,
      };
    });

    const updatedDevs = await Promise.all(devs);
    return updatedDevs;
  };

  const [devs, setDevs] = useState<Dev[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const updatedDevs = await fetchDevData();
      setDevs(updatedDevs);
    };

    fetchData();
  }, [datos, id_product]);

  const getProducts = async () => {
    const response = await fetch('http://127.0.0.1:5000/products/all');
    const data = await response.json();
    const productos = data
      .filter((producto: Producto) => producto.id_encargado === 2)
      .map((item: Producto) => {
        return {
          nombre: item.nombre,
          id: item.id,
        };
      });

    return productos;
  };

  const [products, setProducts] = useState<Producto[]>([]);

  useEffect(() => {
    getProducts().then((productos) => {
      setProducts(productos);
    });
  }, []);

  const data = {
    columns: [
      {
        label: 'Nombre',
        field: 'nombre',
        sort: 'asc',
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
      },
      {
        label: 'Reportes \n (Producto)',
        field: 'num_reportes',
        sort: 'asc',
      },
      {
        label: 'Reportes Asignados',
        field: 'modal',
        sort: 'asc',
      },
    ],
    rows: devs,
  };

  return (
    <Container>
      <Card style={{ width: '40rem', height: '20rem'}}>
        <Card.Body>
          <Stack direction="horizontal" gap={3}>
            <div >
              <Card.Title className="text-black">Desarrolladores de :</Card.Title>
            </div>
            <div>
              <select name="Producto" onChange={selectChange}>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.nombre}
                  </option>
                ))}
              </select>
            </div>
          </Stack>

          <MDBTable scrollY >
            <MDBTableHead columns={data.columns} />
            <MDBTableBody rows={data.rows} />
          </MDBTable>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ListaDev;