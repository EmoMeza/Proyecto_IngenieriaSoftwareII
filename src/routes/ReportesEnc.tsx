import React from "react";
import ReportesDev from "../components/ReportesDev";
import ListaRPEnc from "./ListaRPEnc";
import SearchBar from "../components/SearchBar";
import HeaderEncargado from '../components/HeaderEncargado';

type Props = {};




const Reportes = (props: Props) => {
    return (
      <div>
        <HeaderEncargado></HeaderEncargado>
        <br />

        <ListaRPEnc></ListaRPEnc>
      </div>
    );
  };
  
  export default Reportes;