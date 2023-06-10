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
  estado: string;
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
      <ReportTable Items={filteredItems} id_product={id_product} />
    </div>
  );
}
