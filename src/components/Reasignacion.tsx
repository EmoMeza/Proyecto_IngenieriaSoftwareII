import * as React from 'react';
import {Stack, Card,Container,Button} from 'react-bootstrap';
import { useState, useEffect } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import ReasignacionButton from './ReasignacionButton';
import { render } from 'react-dom';

interface IReasignacionProps {
    
}

type reporte = {
    id_report: number;
    id_developer:number;
    date:string;
    motivo:string;
    developer_name:string;
    report_title:string;
    id_prioridad:number;
}

type producto = {
  nombre: string;
  id: number;
  id_encargado: number;
}

const Reasignacion: React.FunctionComponent<IReasignacionProps> = (props) => {

  const [id_product, setId_product] = useState<number>(1);
  const [datos, setUsers] = useState([]);

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setId_product(parseInt(event.target.value,10));
  };

 

  const fetchData = () => {
    fetch("http://127.0.0.1:5000/reasignacion/get/all/product/?id_product="+id_product)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
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
      titulo:<Button href={"/VerReporteEnv/"+reports.id_report}  variant="link">{reports.report_title}</Button>, 
      desarollador: reports.developer_name,
      prioridad_a: nombreP(reports.id_prioridad),
      asignacion:<ReasignacionButton id_producto={id_product} id_report ={reports.id_report} id_developer={reports.id_developer} developer_name={reports.developer_name} date={reports.date} motivo={reports.motivo} ></ReasignacionButton>
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
        label: 'Desarrollador',
        field: 'desarollador',
        sort: 'asc'
      },
      {
        label: 'Prioridad',
        field: 'prioridad',
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
          <Card style={{ width: '43rem', height: '19rem'}}>
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
                <div >
                  <Card.Title className="text-black" >
                    Solicitud de reasignacion de :
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

              <div style={{ width: '41rem', height: '14rem', overflowY: 'scroll' }}>
                <MDBTable >
                  <MDBTableHead  columns={data.columns} />
                  <MDBTableBody rows={data.rows } />
                </MDBTable>
            </div>            
              
              
            </Card.Body>
          </Card>
    </Container>
    
  );
};

export default Reasignacion;
