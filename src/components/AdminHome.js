import React, { Component } from 'react'
import '../styles/AdminHome.css';
import AddMovie from './AddMovie';

import {
  Table,
  Button,
} from 'react-bootstrap';

const baseUrl = 'http://localhost:4000/';
class AdminHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      showAddMoviePage: false,
      currentUser: this.props.username
    }
  }
  
  componentDidMount() {
    console.log("current user", this.state.currentUser)
    fetch(`${baseUrl}admin/getall`)
      .then(res => res.json())
      .then(movies => {
        console.log(movies.length);
        this.setState({ movies: movies.data })
      })
      .catch(err => {
        console.log(err)
      })
  }
  addMovie() {
    this.setState({
      showAddMoviePage: true
    })
    // fetch(`${baseUrl}addrecipe`, {
    //     method: 'post',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify()
    // })
    //     .then(res => res.json())
    //     .then((res) => {
    //         console.log(res, "API Response")
    //     })
    //     .catch(err => {})
  }
  
  handleAction = (action) => {
    console.log(action, 'acr')
    if (action === 'edit') {
      // fetch(`${baseUrl}edit`, {
      //     method: 'post',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify()
      // })
      //     .then(res => res.json())
      //     .then((res) => {
      //     })
      //     .catch(err => {})
    }
    else {
      // fetch(`${baseUrl}delete`, {
      //     method: 'post',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify()
      // })
      //     .then(res => res.json())
      //     .then((res) => {
      //         console.log("after adding")
      //         		   })
      //     .catch(err => {})

    }
  }
  
  render() {
    return (
      <div className='container-fluid adminShowMovie'>
        {
          this.state.showAddMoviePage === false &&
          <>
            <div>
              <Button onClick={() => this.addMovie()}>Add Movie</Button>
            </div>
            <div className='row movieTableContainer'>
              <Table striped bordered hover>
                <thead>
                  <tr className="tableTitle">
                    <th>Movie Image</th>
                    <th>Movie Name</th>
                    <th >Rating</th>
                    <th>Actor Name</th>
                    <th>Director Name</th>
                    <th>Genre</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.movies.map((item =>
                    <tr className="tableTitle" onClick={() => this.showRecipe(item)}>
                      <td></td>
                      <td>{item.movieName}</td>
                      <td>{item.rating}</td>
                      <td>{item.actors.join(',')}</td>
                      <td>{item.director}</td>
                      <td>{item.genres.join(',')}</td>
                      <td><Button onClick={this.handleAction('edit')}>Edit</Button></td>
                      <td><Button onClick={this.handleAction('delete')}>Delete</Button></td>
                    </tr>))}
                </tbody>
              </Table>
            </div>
          </>}
        <div className='addMovieForm'>
          {this.state.showAddMoviePage && <AddMovie />}
        </div>
      </div >
    )
  }
}

// const withContext = () => (
//     <UserContext.Consumer>
//         {(contextProps) => (<AddMovie {...contextProps} />)}
//     </UserContext.Consumer>
// );

// export default withContext;
export default AdminHome;
