import React from "react";
import Reportes_sin_Asignar from "../components/Reportes_sin_Asignar";
import Reasignacion from "../components/Reasignacion";
import Header from "../components/Header";

type Props = {};




const Asignacion = (props: Props) => {
    return (
      <div>
        <Header></Header>
        <Reportes_sin_Asignar></Reportes_sin_Asignar>
        <br />
        <Reasignacion></Reasignacion>
      </div>
    );
  };
  
  export default Asignacion;
  