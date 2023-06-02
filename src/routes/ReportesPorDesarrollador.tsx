import React from "react";
import Form from "../components/Form";
import Header from "../components/Header";
import "./Ingresa.css";
import DesarrolladorHeader from "../components/DesarrolladorHeader";
import ListaDeBugsPorDesarrollador from "../components/ListaDeBugsPorDesarrollador";
import DropdownDeveloperButton from "../components/DropdownDeveloperButton";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
type ParentComponentProps = {};

type ParentComponentState = {
  id_dev: string;
};

class ReportesPorDesarrollador extends React.Component<
  ParentComponentProps,
  ParentComponentState
> {
  constructor(props: ParentComponentProps) {
    super(props);
    this.state = {
      id_dev: '3', // Initial value for id_dev
    };
  }

  handleIdDevChange = (newIdDev: string) => {
    this.setState({ id_dev: newIdDev });
  };

  render() {
    const { id_dev } = this.state;

    return (
      <Container>
        <Row>
         <Col md={{ span: 1, offset: 1 }}>      
        <DropdownDeveloperButton
          id_dev={id_dev}
          onIdDevChange={this.handleIdDevChange}
          
        />
        
          </Col>
          </Row>
          <Col xs={10}>     
        <ListaDeBugsPorDesarrollador id_dev={id_dev}></ListaDeBugsPorDesarrollador>
        </Col>
      </Container>
    );
  }
}

export default ReportesPorDesarrollador;