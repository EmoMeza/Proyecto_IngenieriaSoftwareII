import React from "react";
import ReportesDev from "../components/ReportesDev";
import ListaRPDev from "./ListaRPDev";
import SearchBar from "../components/SearchBar";
import HeaderDev from '../components/HeaderDev';

type Props = {};




const Reportes = (props: Props) => {
    return (
      <div>
        <HeaderDev></HeaderDev>
        <br />

        <ListaRPDev></ListaRPDev>
      </div>
    );
  };
  
  export default Reportes;