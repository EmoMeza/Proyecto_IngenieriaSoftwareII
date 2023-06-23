import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Col ,Card, Container, Button, Row } from 'react-bootstrap';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import "../routes/App.css"
import "./SearchBar.css"
import LikeButton from "./LikeButton";
import dayjs from "dayjs";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


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

const getEstados = (): EstadoDictionary => {
  const [estados, setEstados] = useState<EstadoDictionary>({});

  const fetchEstados = () => {
    fetch("http://127.0.0.1:5000/reports/estados/all")
      .then((response) => response.json())
      .then((data: Estado[]) => {
        const estadosDictionary: EstadoDictionary = {};
        data.forEach((estado) => {
          estadosDictionary[estado.id] = estado.nombre;
        });
        setEstados(estadosDictionary);
      });
  };

  useEffect(() => {
    fetchEstados();
  }, []);

  return estados;
};



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


const getFilteredItems = (query: string, items: reporte[]) => {
  query = query.toLowerCase();
  if (!query) {
    return items;
  }
  return items.filter((bug: reporte) => bug.title.toLowerCase().includes(query));
};

export default function SearchBar() {
  const users = getData();
  const estados = getEstados();
  const [id_product, setId_product] = useState(1);
  const [query, setQuery] = useState("");
  const [name_product, setName] = useState("jarro3000v1.69");
  const filteredItems = getFilteredItems(query, users);
  const reports = filteredItems.map((report: reporte) => {
    return {
      titulo: <Button href={"/VerReporte/" + report.id} variant="link">{report.title}</Button>,
      fecha: dayjs(report.date).format("MM/DD/YYYY"),
      estado: estados[report.id_estado],
      likes: report.likes,
      like: <LikeButton id_bug={report.id} id_user={2}></LikeButton>,   //// HARDCODEADO EL ID DEL USUARIO :C
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
        <Row >
        
        <DropdownButton
          size="lg"
          id="dropdown-button-dark"
          variant="primary" 
          align="end"
          title={name_product}
          >
          {products.map((product) => (
            <Dropdown.Item onClick={() => {(setId_product(product.id));  (setName(product.nombre))}}>
              {product.nombre}
            </Dropdown.Item>
          ))}

        </DropdownButton>
        
        </Row>

        <br></br>
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
