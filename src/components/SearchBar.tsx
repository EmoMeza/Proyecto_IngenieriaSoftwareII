import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Card, Container, Button } from 'react-bootstrap';
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
  const filteredItems = getFilteredItems(query, users);


  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setId_product(parseInt(event.target.value, 10));
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
      <div style={{ marginBottom: '20px' }}>
        <select name="Producto" onChange={selectChange} >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.nombre}
            </option>
          ))}
        </select>
      </div>
      <input
        id="custom-search-bar"
        className="form-control form-control-s"
        type="search"
        aria-label="search"
        placeholder="Busca tu bug"
        style={{ marginBottom: '20px' }}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ReportTable Items={filteredItems} id_product={id_product} estados = {estados} />
    </div>
  );
}
