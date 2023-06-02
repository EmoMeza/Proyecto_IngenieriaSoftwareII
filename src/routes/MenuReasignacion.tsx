import React from "react";
import Reasignacion from "../components/Reasignacion";
import ListaDev from "../components/ListaDev";
import Header from "../components/Header";

type Props = {};




const MenuReasignacion = (props: Props) => {
    return (
      <div>
        <Header></Header>
        <ListaDev></ListaDev>
        <br />
        <Reasignacion></Reasignacion>
      </div>
    );
  };
  
  export default MenuReasignacion;
  