import React from "react";
import Reasignacion from "../components/Reasignacion";
import ListaDev from "../components/ListaDev";
import HeaderEncargado from "../components/HeaderEncargado";

type Props = {};




const MenuReasignacion = (props: Props) => {
    return (
      <div>
        <HeaderEncargado></HeaderEncargado>
        <ListaDev></ListaDev>
        <br />
        <Reasignacion></Reasignacion>
      </div>
    );
  };
  
  export default MenuReasignacion;
  