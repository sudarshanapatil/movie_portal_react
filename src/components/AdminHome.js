import React, { Component } from 'react';
import {
  Table,
  Modal,
  Button,
  Form, FormControl
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import conf from '../conf.json';
import '../styles/AdminHome.css';
import AddMovie from './AddMovie';
import LogsData from './LogsData';
import UserContext from '../context/user';

const baseUrl = conf.production.baseUrl;
class AdminHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiData: [],
      movies: [],
      showAddMoviePage: false,
      showEditPage: false,
      editData: '',
      showLogs: false,
      logs: [],
      searchData: '',
      currentUser: this.props.username,
      showAlert:false,
      alertHeading: 'Success',
      alertMessage: 'Successfully done!'
    }
  }

  componentDidMount() {
    axios.get(`${baseUrl}admin/getall`, {
      headers: { Authorization: `Bearer ${this.props.token}` }
    })
      .then(response => {
        this.setState({ movies: response.data.data, apiData: response.data.data })
      })
      .catch(err => { })
  }

  fetchData = () => {
    axios.get(`${baseUrl}admin/getall`, {
      headers: { Authorization: `Bearer ${this.props.token}` }
    })
      .then(response => {
        this.setState({ movies: response.data.data, apiData: response.data.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  search = (e) => {
    e.preventDefault();
    axios.post(
      `${baseUrl}filter`,
      { search: this.state.searchData })
      .then((res) => {
        if (res.data) {
          this.setState({ movies: res.data.data })
        }
      })
      .catch(err => { })
  }

  handleChange = (event) => {
    this.setState({ searchData: event.target.value })
    if (event.target.value === '')
      this.setState({ movies: this.state.apiData })

  }

  showLogs = () => {
    axios.get(`${baseUrl}admin/getlogs`, {
      headers: { Authorization: `Bearer ${this.props.token}` }
    })
      .then(response => {
        this.setState({ showLogs: true, logs: response.data.data })
      })
      .catch(err => {
        console.log(err)
      });
  }

  handleClose = () => {
    this.setState({ showAlert: false })
  }

  goBack = () => {
    this.setState({
      showAddMoviePage: false,
      showEditPage: false,
      showLogs: false
    })
  }

  addMovie = () => {
    this.setState({
      showAddMoviePage: true
    })
  }

  handleAction = (data) => {
    let { action, id, editData } = data;
    if (action === 'edit') {
      this.setState({ showEditPage: true, editData })
    }
    else {
      axios.post(
        `${baseUrl}admin/delete`,
        { id },
        {
          headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.setState({showAlert:true})
            axios.get(
              `${baseUrl}admin/getall`,
              {
                headers: { Authorization: `Bearer ${this.props.token}` }
              })
              .then(movies => {
                this.setState({ movies: movies.data.data })
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
        .catch(err => { })
    }
  }

  render() {
    if (this.props.token === '') {
      return (
        <Redirect to="/admin/login" />
      );
    }
    return (
      <div className='container-fluid adminShowMovie'>
        {
          this.state.showLogs === true &&
          <LogsData data={this.state.logs} goBack={() => this.setState({ showLogs: false })} />
        }
        {this.state.showAlert &&
          <Modal show={true} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.alertHeading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.alertMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Ok
                </Button>
            </Modal.Footer>
          </Modal>
        }
        {
          this.state.showAddMoviePage === false && this.state.showEditPage === false
          && this.state.showLogs === false &&
          <>
            <div className='adminTitle'>
              Movie Portal
            </div>
            <div className='row adminFilter'>
              <div className='col'>
                <Button className='adminButton'
                  onClick={() => this.addMovie()}>
                  Add Movie
                </Button>
              </div>
              <div className='col'>
                <Button className='adminButton'
                  onClick={() => this.showLogs()}>
                  Show Logs
                </Button>
              </div>
              <Form inline onSubmit={(e) => this.search(e)}>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.handleChange} />
                <Button className='adminButton' onClick={(e) => this.search(e)}>Search</Button>
              </Form>
            </div>
            <div className='row movieTableContainer'>
              <Table>
                <thead>
                  <tr>
                    <th className='tableTitle'>MOVIE BANNER</th>
                    <th className='tableTitle'>MOVIE NAME</th>
                    <th className='tableTitle'>RATING</th>
                    <th className='tableTitle'>ACTORS NAME</th>
                    <th className='tableTitle'>DIRECTOR NAME</th>
                    <th className='tableTitle'>GENRE</th>
                    <th className='tableTitle'>EDIT</th>
                    <th className='tableTitle'>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.movies.map((item =>
                    <tr className="tableTitle" key={item['_id']} >
                      <td> <img className='adminMovieImage'
                        alt='movieImage'
                        src={require(`../images/movie${Math.floor(Math.random() * 6) + 1}.jpg`)}>
                      </img>
                      </td>
                      <td>{item.movieName}</td>
                      <td>{item.rating}</td>
                      <td>{item.actors.join(', ')}</td>
                      <td>{item.director}</td>
                      <td>{item.genres.join(', ')}</td>
                      <td>
                        <Button className='adminButton'
                          onClick={() => { this.handleAction({ action: 'edit', editData: item, }) }}>
                          Edit
                        </Button>
                      </td>
                      <td>
                        <Button className='adminButtonDelete'
                          onClick={() => { this.handleAction({ action: 'delete', id: item._id }) }}>
                          Delete
                          </Button>
                      </td>
                    </tr>))}
                </tbody>
              </Table>
            </div>
          </>}
        <div className='addMovieForm'>
          {this.state.showAddMoviePage && <AddMovie data={"Add Movie"} type='add'
            goBack={() => this.setState({ showAddMoviePage: false })} token={this.props.token} />}
        </div>
        <div className='addMovieForm'>
          {this.state.showEditPage && <AddMovie data={this.state.editData} type='edit' fetchData={this.fetchData}
            goBack={() => this.setState({ showEditPage: false })} token={this.props.token} />}
        </div>
      </div >
    )
  }
}

const withContext = () => (
  <UserContext.Consumer>
    {(contextProps) => (<AdminHome token={contextProps.token} />)}
  </UserContext.Consumer>
);

export default withContext;
