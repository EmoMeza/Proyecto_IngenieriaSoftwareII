import React from "react";
import Reportes_sin_Asignar from "../components/Reportes_sin_Asignar";
import ListaDev from "../components/ListaDev";
import Header from "../components/Header";

type Props = {};




const Asignacion = (props: Props) => {
    return (
      <div>
        <Header></Header>
        <ListaDev></ListaDev>
        <br />
        <Reportes_sin_Asignar></Reportes_sin_Asignar>        
      </div>
    );
  };
  
  export default Asignacion;
  