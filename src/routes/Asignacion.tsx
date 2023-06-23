import React from "react";
import Reportes_sin_Asignar from "../components/Reportes_sin_Asignar";
import ListaDev from "../components/ListaDev";
import HeaderEncargado from "../components/HeaderEncargado";
import { Col,Row, Container } from 'react-bootstrap';
import "./Asignacion.css";
import Reasignacion from "../components/Reasignacion";

type Props = {};



 
const Asignacion = (props: Props) => {
    return (
      <Container className="Container">
        <HeaderEncargado></HeaderEncargado>
        <Row >
          <Col xs={6} >
            <ListaDev></ListaDev>
            <br />
            <Reasignacion></Reasignacion>
          </Col>
          <Col xs={6}>
          <Reportes_sin_Asignar ></Reportes_sin_Asignar>
          </Col>
        </Row>

      </Container> 
      
    );
  };
  
  export default Asignacion;
  