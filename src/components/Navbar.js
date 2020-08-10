import React from 'react';
import {
  Button, Form, Navbar, Nav, FormControl
} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import '../styles/Navbar.css';

class NavbarComp extends React.Component {
  constructor() {
    super();
    this.state = {
      search: ""
    }
  }

  handleChange(e) {
    this.setState({
      search: e.target.value
    });
  }

  handleSearch(e) {
    e.preventDefault();
    if (this.state.search !== "") {
      this.props.history.push({
        pathname: '/movies',
        searchData: this.state.search,
        emptySearch: () => {
          this.setState({search: ''})
        }
      });
    }
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className='navMenu' href="/">Home</Nav.Link>
            <Nav.Link href="/movies">Movies</Nav.Link>
          </Nav>
          <Form inline onSubmit={(e) => this.handleSearch(e)}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={this.state.search}
              onChange={(e) => this.handleChange(e)}
            />
            <Button style={{backgroundColor:"blue"}} onClick={(e) => this.handleSearch(e)}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavbarComp;
