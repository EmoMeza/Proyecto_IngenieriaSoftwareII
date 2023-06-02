import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import Bug from "../components/Bug";
import CustomCard from "../components/CustomCard";

type bugardo = {
  date: string;
  description: string;
  id: number;
  id_producto: string;
  likes: number;
  estado: string;
  title: string;
  id_encargado: number;
};

export default function ListaDeBugsPorDesarrollador(props: {id_dev: string}) {
  const [users, setUsers] = useState([]);

  const fetchUserData = () => {
    fetch("http://127.0.0.1:5000/dev/reportes/?id_dev="+props.id_dev)
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

  const items = users.map((item: bugardo) => {
    return new Bug(item.id, item.title, item.description, 'placeholder', item.estado, item.likes);
  });

  return (
    <ul>
      {items.map((value) => (
        <CustomCard bug={value} key={value.id} />
      ))}
    </ul>
  );
}