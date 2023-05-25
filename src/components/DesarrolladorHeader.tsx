import { Container,Navbar,Nav}  from 'react-bootstrap'; 
import DropdownDeveloperButton from './DropdownDeveloperButton';


export default function DesarrolladorHeader(){
    return (
        <Navbar fixed='top' collapseOnSelect expand="md" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Monster-Inc</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                      <Nav.Link href="/">Acerca de Nosotros</Nav.Link>
                      <Nav.Link  href="/IngresarBug">Ingresar Bug</Nav.Link>
                      <DropdownDeveloperButton/>
                  </Nav>
                  <Nav>
                    <Nav.Link href="#link">Perfil</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
          </Container>
          
        </Navbar>    
      );
    };
    
