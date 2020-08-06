import React from 'react';
import {
    Container, Row, Col, Dropdown, DropdownButton,
    Button, Form, NavDropdown, Navbar, Nav, FormControl

} from 'react-bootstrap';
import '../styles/Navbar.css'

function NavbarComp() {
    return (
        <Navbar bg="light" expand="lg">
            {/* <Navbar.Brand href="#home">Kambekar Maharaj</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Movies</Nav.Link>
                    
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
       
    );
}

export default NavbarComp;

