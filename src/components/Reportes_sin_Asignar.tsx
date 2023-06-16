import * as React from 'react';
import {Stack,Card,Container,Button, Dropdown} from 'react-bootstrap';
import { useState, useEffect } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import AsignacionButton from './AsignacionButton';
import DropdownPrioridad from './DropdownPrioridad';

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

type producto = {
  nombre: string;
  id: number;
  id_encargado: number;
}



const Reportes_sin_Asignar: React.FunctionComponent<IReportes_sin_AsignarProps> = (props) => {

  const [ id_product, setId_product] = useState(1);
  const [datos, setDatos] = useState([]);


  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setId_product(parseInt(event.target.value,10));
  };

  

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
    return fetchData();
  }, [id_product]);
  

  const nombreP = (id_prioridad:number) => {
    switch (id_prioridad) {
      case 1:
        return "Alta";
      case 2:
        return "Media";
      case 3:
        return "Baja";
      default:
        return "Sin Prioridad";
    }
  }

  const reports = datos.map((reports:reporte) => {
    return {
      titulo:<Button href={"/VerReporteEnv/"+reports.id} variant="link">{reports.titulo}</Button>, 
      likes:reports.likes,
      prioridad:nombreP(reports.id_prioridad),
      asignacion:<AsignacionButton id_report ={reports.id}  ></AsignacionButton>,
      prioridad_a: <DropdownPrioridad id_report={reports.id}></DropdownPrioridad>
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
        label: 'Likes',
        field: 'likes',
        sort: 'asc'
      },
      {
        label: 'Prioridad',
        field: 'prioridad',
        sort: 'asc'
      },
      {
        label: 'Asignacion',
        field: 'asignacion',
        sort: 'asc'
        }
        ,
      {
        label: 'Asignacion de ',
        field: 'prioridad_a',
        sort: 'asc'
        }
    ],
    rows: reports
  };
  
  const getProducts = () => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetch("http://127.0.0.1:5000/products/all")
        .then((response) => response.json())
        .then((data) => setProducts(data));
    }, []);

    const productos = products.filter((producto:producto) => producto.id_encargado === 2).map((item: producto) =>{
      return {
        nombre:item.nombre, id:item.id
        }
      });

    return productos;
  };

  const products=getProducts();

  return (
    <Container>

          <Card style={{ width: '47rem', height: '40rem'}}>
            <Card.Body>

            <Stack direction="horizontal" gap={3}>
                <div >
                <Card.Title className="text-black">
                  Reportes sin Asignar de :
                </Card.Title>   
                </div>
                <div >
                  <select name="Producto" onChange={selectChange} >
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </Stack>

            <div style={{ width: '45rem', height: '36rem', overflowY: 'scroll' }}>
                <MDBTable >
                  <MDBTableHead  columns={data.columns} />
                  <MDBTableBody rows={data.rows } />
                </MDBTable>
              </div>

    
              <MDBTable scrollY>
                
              </MDBTable>
            </Card.Body>
          </Card>
    </Container>
    
  );
};

export default Reportes_sin_Asignar;


