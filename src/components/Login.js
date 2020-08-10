import React, { Component } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import UserContext from '../context/user';
import '../App.css';
import '../styles/Login.css';
import conf from '../conf.json';

const baseUrl = conf.dev.baseUrl;
class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let { username, password } = this.state;

    axios.post(`${baseUrl}admin/login`, {
      username,
      password
    })
      .then((response) => {
        if (response.status === 200) {
          this.props.updateToken(response.data.token);
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    if (this.props.token !== '') {
      return (
        <Redirect to="/admin" />
      );
    }
    return (
      <div className='login-body'>
        <div className='login-section'>
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type='text'
                name='username'
                placeholder='Enter username'
                onChange={(e) => this.handleChange(e)}
              />

            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                onChange={(e) => this.handleChange(e)}
                placeholder='Password'
              />
            </Form.Group>

            <button className='loginButton' variant='warning' type='submit'>
              Login
            </button>
          </Form>
        </div>
      </div>
    )
  }
}

const withContext = () => (
  <UserContext.Consumer>
    {(contextProps) => (<Login {...contextProps} />)}
  </UserContext.Consumer>
);

export default withContext;
