import * as React from "react";
import {useState, useEffect} from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Routes, Route, useNavigate } from "react-router-dom";
import Product from "./Product";
type FormValues = {
  title: string;
  description: string;
  id_product: number;
};

type product_form = {
  nombre: string;
  id: number;
  id_encargado: number;
}



const getProducts = () => {
  const [products, setProducts] = useState([]);

useEffect(() => {
  fetch("http://127.0.0.1:5000/products/all")
    .then((response) => response.json())
    .then((data) => setProducts(data));
}, []);
return products;
};

function Form(): JSX.Element {
  const rawProducts = getProducts();
  const products = rawProducts.map((item: product_form) =>{
    return new Product(item.nombre, item.id, item.id_encargado)
  });
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/");
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const id_producto = data.id_product;
    const url = "http://127.0.0.1:5000/reports/add?id_product=" + id_producto;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      navigateHome();
    }
  };



  return (
    <div style={{ display: "flex" }}>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} className="form-react">
        <div className="form-title">
          <h2 className="space-taker"></h2>
          <label>Titulo</label>
          <input type="text" {...register("title")} />
        </div>
        <div className="form-product">
      <label>Producto</label>
      <select {...register("id_product")}>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.nombre}
          </option>
        ))}
      </select>
    </div>
        <div className="form-description">
          <label>Descripcion</label>
          <textarea {...register("description")}></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Form;
