import * as React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './Header.css'

interface IHeaderProps {

}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (

    <div className="header">
      <Navbar fixed='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/ReportesEnc">Monster-Inc</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/Asignacion">Asignacion</Nav.Link>
              <Nav.Link href="/ReportesEnc">Todos los reportes</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#link">Encargado emomeza@udec.cl</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>

      </Navbar>
    </div>
  );
};

export default Header;
