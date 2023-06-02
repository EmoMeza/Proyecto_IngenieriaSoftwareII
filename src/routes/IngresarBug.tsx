import React from "react";
import Form from "../components/Form";
import Header from "../components/Header";
import "./Ingresa.css";

type Props = {};

const IngresarBug = (props: Props) => {
  return (
    <div id="form-bug">
      <Header />
      <div>
        <h2 className="space-taker"></h2>
        <h2 className="space-taker"></h2>
        <h2 className="space-taker"></h2>
        
      </div>
      <div>
      <Form></Form>
      </div>
    </div>
  );
};

export default IngresarBug;
