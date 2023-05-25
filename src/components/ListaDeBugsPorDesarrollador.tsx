import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import Bug from "../components/Bug";
import CustomCard from "../components/CustomCard";

type bugardo = {
  descripcion: string;
  fecha: Date;
  id: number;
  id_estado: number;
  id_prioridad: number;
  id_producto: number;
  likes: number;
  titulo: string;
};

export default function ListaDeBugsPorDesarrollador(props: { id_dev: string }) {
  const [users, setUsers] = useState<bugardo[]>([]);

  const fetchUserData = () => {
    fetch("http://127.0.0.1:5000/dev/reportes/?id_dev=" + props.id_dev)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, [props.id_dev]); // Add props.id_dev as a dependency

  const items = users.map((item: bugardo) => {
    return new Bug(item.id, item.titulo, item.descripcion, 'placeholder', item.id_estado, item.likes);
  });

  return (
    <ul>
      {items.map((value) => (
        <CustomCard bug={value} key={value.id} />
      ))}
    </ul>
  );
}
