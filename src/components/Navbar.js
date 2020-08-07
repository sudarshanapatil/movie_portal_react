import React from 'react';
import {
	Container, Row, Col, Dropdown, DropdownButton,
	Button, Form, NavDropdown, Navbar, Nav, FormControl

} from 'react-bootstrap';
import '../styles/Navbar.css';
import Select from 'react-select';
let genre = [{ value: 'All Genres', label: 'All Genres' },
{ value: 'Comedy', label: 'Comedy', },
{ value: 'Action', label: 'Action', },
{ value: 'Horror', label: 'Horror' }]
class NavbarComp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			defaultValue: 'Select a color',
			currentValues: []
		}
	}
	selectGenre = (event) => {
		console.log(event.target)
	}
	render() {
		return (
			<>
				<Navbar bg="light" expand="lg">
					{/* <Navbar.Brand href="#home">Kambekar Maharaj</Navbar.Brand> */}
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link className='navMenu' href="#home">Home</Nav.Link>
							<Nav.Link href="#link">Movies</Nav.Link>

						</Nav>
						<Select
							closeMenuOnSelect={false}
							defaultValue={[{ label: 'all genre' }]}
							isMulti
							options={genre}
							onChange={this.selectGenre}
						// styles={colourStyles}
						/>
						<Form inline>
							<FormControl type="text" placeholder="Search" className="mr-sm-2" />
							<Button variant="outline-success">Search</Button>
						</Form>
					</Navbar.Collapse>

				</Navbar>


			</>
		);
	}
}



export default NavbarComp;

