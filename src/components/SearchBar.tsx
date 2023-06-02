import { useState, useEffect } from "react";
import Bug from "./Bug";
import CustomCard from "./CustomCard";

type bugardo = {
  date: string;
  description: string;
  id: number;
  id_producto: string;
  likes: number;
  estado:string;
  title: string;
  id_encargado: number;
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

const getFilteredItems = (query: string, items: Bug[]) => {
  query = query.toLowerCase();
  if (!query) {
    return items;
  }
  return items.filter((bug: Bug) => bug.titulo.toLowerCase().includes(query));
};
export default function SearchBar() {
  const users = getData();
  const [query, setQuery] = useState("");
  const items = users.map((item: bugardo) => {
    return new Bug(item.id,item.title, item.description, 'placeholder',item.estado ,item.likes);
  });

  const filteredItems = getFilteredItems(query, items);
  return (
    <div className="container-xl">
      <h2 className="space-taker"></h2>
      <h2 className="space-taker"></h2>
      <label></label>
      <input
        id="search-bar"
        className="form-control form-control-lg"
        type="search"
        aria-label="search"
        placeholder="Busca tu bug"
        onChange={(e) => setQuery(e.target.value)}
      />

      <h5 className="space-taker"></h5>
      <ul className="mx-auto">
        {filteredItems.map((value) => (
          <CustomCard bug={value}></CustomCard>
        ))}
      </ul>
    </div>
  );
}
