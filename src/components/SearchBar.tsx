import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Card,Container,Button} from 'react-bootstrap';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import TomarBugButton from "../components/TomarBugButton"
import "../routes/App.css"
import LikeButton from "./LikeButton";
type reporte = {
  date: Date;
  description:string;
  estado:string;
  id: number;
  id_producto: number;
  likes: number;
  title: string;
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
  const [query, setQuery] = useState("");
  const filteredItems = getFilteredItems(query, users);
  const reports = filteredItems.map((report:reporte) => {
    return {
      titulo: report.title, 
      likes:report.likes,
      fecha:report.date,
      estado: report.estado,
      like:<LikeButton id={report.id}/>
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
        label: ' ',
        field: 'like',
        sort: 'asc'
        }
    ],
    rows: reports
  };
 
  return (
    <div className="search-container">
      <h2 className="space-taker"></h2>
      <h2 className="space-taker"></h2>
      <label></label>
      <input
        id="custom-search-bar"
        className="form-control form-control-s"
        type="search"
        aria-label="search"
        placeholder="Busca tu bug"
        onChange={(e) => setQuery(e.target.value)}
      />

      <h5 className="space-taker"></h5>
      <ul>
        <Container className="table-search-container">
          <Card>
            <Card.Body>
              <Card.Title className="text-black">
                Reportes
              </Card.Title>
              <MDBTable scrollY>
                <MDBTableHead columns={data.columns} />
                <MDBTableBody rows={data.rows} />
              </MDBTable>
            </Card.Body>
          </Card>
        </Container>
      </ul>
    </div>
  );
}
