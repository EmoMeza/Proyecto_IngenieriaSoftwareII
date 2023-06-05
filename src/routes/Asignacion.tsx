import React from "react";
import Reportes_sin_Asignar from "../components/Reportes_sin_Asignar";
import ListaDev from "../components/ListaDev";
import HeaderEncargado from "../components/HeaderEncargado";

type Props = {};




const Asignacion = (props: Props) => {
    return (
      <div>
        <HeaderEncargado></HeaderEncargado>
        <ListaDev></ListaDev>
        <br />
        <Reportes_sin_Asignar></Reportes_sin_Asignar>        
      </div>
    );
  };
  
  export default Asignacion;
  