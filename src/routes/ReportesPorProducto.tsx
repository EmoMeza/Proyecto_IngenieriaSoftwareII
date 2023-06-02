import React from "react";
import DropdownDeveloperButton from "../components/DropdownDeveloperButton";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListaDeBugsPorDesarrollador from "../components/ListaDeBugsPorDesarrollador";
import Header from "../components/Header";
import "./App.css"


type ParentComponentProps = {};

type ParentComponentState = {
  id_dev: number; // Change the type to number
  nombre_producto: string;
};

class ReportesPorDesarrollador extends React.Component<
  ParentComponentProps,
  ParentComponentState
> {
  constructor(props: ParentComponentProps) {
    super(props);
    this.state = {
      id_dev: 1, // Initial value for id_dev
      nombre_producto: 'jarro3000v1.69',
    };
  }

  handleIdDevChange = (newIdDev: number, nombre: string) => {
    this.setState({ id_dev: newIdDev, nombre_producto: nombre });
  };

  render() {
    const { id_dev, nombre_producto } = this.state;

    return (
      <Container className="reportes-por-producto">
        <Header>...</Header>
        <div className="dropdown-container">
          <DropdownDeveloperButton
            id_dev={id_dev.toString()}
            nombre={nombre_producto}
            onIdDevChange={this.handleIdDevChange}
          />
        </div>
        <h1 className="space-taker">    </h1>
        <div className="bugs-list-container">
          <ListaDeBugsPorDesarrollador
            id_product={id_dev.toString()}
            nombre_producto={nombre_producto}
          />
        </div>
      </Container>
    );
    
  }
}

export default ReportesPorDesarrollador;