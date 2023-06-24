import * as React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './Header.css';

interface IHeaderProps { }

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <div className="header">
      <Navbar fixed='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Monster-Inc</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/IngresarBug">Ingresar Bug</Nav.Link>
              <Nav.Link href="/MisReportes">Mis Reportes</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#link">Cliente</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
