import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Col ,Card, Container, Button, Row } from 'react-bootstrap';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import "../routes/App.css"
import "./SearchBar.css"
import ReportTable from "./ReportTable"
import LikeButton from "./LikeButton";


type reporte = {
  date: Date;
  description: string;
  id_estado: number;
  id: number;
  id_producto: number;
  likes: number;
  title: string;
}

type producto = {
  nombre: string;
  id: number;
  id_encargado: number;
}

interface Estado {
  id: number;
  nombre: string;
}

type EstadoDictionary = Record<number, string>;



const getData = () => {
  const [users, setUsers] = useState([]);

  const fetchUserData = () => {
    fetch("http://127.0.0.1:5000/reports/all")
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
  return users;
};


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


const getFilteredItems = (query: string, items: reporte[]) => {
  query = query.toLowerCase();
  if (!query) {
    return items;
  }
  return items.filter((bug: reporte) => bug.title.toLowerCase().includes(query));
};

export default function SearchBar() {
  const users = getData();
  const [id_product, setId_product] = useState(1);
  const [query, setQuery] = useState("");
  const filteredItems = getFilteredItems(query, users);
  const reports = filteredItems.map((report: reporte) => {
    return {
      titulo: <Button href={"/VerReporte/" + report.id} variant="link">{report.title}</Button>,
      fecha: report.date,
      estado: EstadoBug(report.id_estado),
      likes: report.likes,
      like: <LikeButton id={report.id}></LikeButton>,
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

  const getProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch("http://127.0.0.1:5000/products/all")
        .then((response) => response.json())
        .then((data) => setProducts(data));
    }, []);

    //const productos = products.filter((producto: producto) => producto.id_encargado === 2).map((item: producto) => { version de linea anterior con filtro
    const productos = products.map((item: producto) => {
      return {
        nombre: item.nombre, id: item.id
      }
    });

    return productos;
  };

  const products = getProducts();

  
  return (
    <div className="search-container">
      <Col>
      <h1 className="titulo">
        Productos
      </h1>
      <div style={{ marginBottom: '25px' }}>
        <Row  md={4}>
          {products.map((product) => (
            <Col >
              <Card >
                <Card.Body className="body-card">
                  <Button variant="primary" size="lg" onClick={() => {
                    setId_product(product.id)
                }}>
                    {product.nombre}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))} 
        </Row>
        </div>

      <Row >
        <input
          id="custom-search-bar"
          className="form-control form-control-s"
          type="search"
          aria-label="search"
          placeholder="Busca tu bug"
          style={{ marginBottom: '20px'}}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Row>
     
      <ul>
        <Container className="table-search-container">
          <Card>
            <Card.Body>
              <Card.Title className="text-black">Reportes de {products.at(id_product-1)?.nombre}</Card.Title> 
              <div style={{ width: '78rem', height: '30rem', overflowY: 'scroll' }}>
                <MDBTable className="tabla">
                  <MDBTableHead columns={data.columns} />
                  <MDBTableBody>
                    {data.rows.filter((row) => row.id_producto === id_product).map((row, index) => (
                      <tr key={index} data-custom="hidden data">
                        <td>{row.titulo}</td>
                        <td>{row.fecha}</td>
                        <td>{row.estado}</td>
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
      </Col>
      
      
    
    </div>
  );
}
