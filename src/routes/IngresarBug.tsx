import React from "react";
import Form from "../components/Form";
import Header from "../components/Header";
import "./Ingresa.css";

type Props = {};

const IngresarBug = (props: Props) => {
  return (
    <div>
      <Header />
      <h2 className="space-taker"></h2>
      <h2 className="space-taker"></h2>
      <h2 className="space-taker"></h2>
      <h2> Ingresa tu duda o inquetud </h2>
      <Form></Form>
    </div>
  );
};

export default IngresarBug;
