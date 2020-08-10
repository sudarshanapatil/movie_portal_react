import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import {
  Button,
  Row,
  Col,
  Form,
  Modal
} from 'react-bootstrap'

import '../styles/AddMovie.css'
import conf from '../conf.json';
import genresData from '../global.json';

const baseUrl = conf.production.baseUrl;

let languageData = ['English', 'Marathi', 'Hindi']
let formData = [
  {
    title: 'Movie Name',
    name: 'movieName'
  },
  {
    title: 'Rating',
    name: 'rating',
  },
  {
    title: 'Release Year',
    name: 'releaseYear'
  },
  {
    title: 'Duration',
    name: 'duration',
  },
  {
    title: 'Director Name',
    name: 'director',
  }

]
let genres = genresData.genres;
class AddMovie extends Component {
  constructor(props) {
    super(props)
    let seletedGenre, remaningGenre;
    if (props.data.genres) {
      seletedGenre = props.data.genres.map((genre => { return ({ value: ((genre.toLowerCase()).trim()), label: genre.trim() }) }))
      remaningGenre = genres.filter(({ value: id1 }) => !seletedGenre.some(({ value: id2 }) => id2 === id1));
    }
    this.state = {
      genresUpdated: [],
      language: props.data.language || 'English',
      defaultSelectedGenres: seletedGenre || [],
      genres: remaningGenre || genres,
      movieName: props.data.movieName || '',
      rating: props.data.rating || '',
      releaseYear: props.data.releaseYear || '',
      duration: props.data.duration || '',
      actors: (props.data.actors) ? props.data.actors.join(', ') : [],
      director: props.data.director || '',
      _id: props.data._id || '',
      alertHeading: 'Success',
      alertMessage: 'Successfully done!'
    }
    this.actorRef = React.createRef();
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  genreHandler = (e) => {
    let genresUpdated = [];
    if (e) {
      genresUpdated = e.map(data => data.value)
    }
    this.setState({
      genresUpdated
    })
  }

  handleClose = () => {
    this.props.goBack();
    this.setState({ showAlert: false })
  }

  saveMovie = () => {
    let {
      language, genres, movieName, rating, releaseYear, duration, actors, director, genresUpdated
    } = this.state
    let movieData = {
      language, genres, movieName, rating, releaseYear, duration, actors, director, genresUpdated
    }
    if (this.props.type === 'add') {
      let actors = this.actorRef.current.value.split(",");
      movieData.actors = actors;
      movieData.genres = this.state.genresUpdated;
      axios.post(
        `${baseUrl}admin/add`,
        movieData,
        {
          headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.setState({ showAlert: true })
          }
          else {
            this.setState({
              showAlert: true, alertHeading: 'Please check your data',
              alertMessage: 'Try again with valid data'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    else if (this.props.type === 'edit') {
      movieData.contentId = this.props.data.contentId;
      movieData.actors = movieData.actors.split(',');
      if (this.state.genresUpdated.length === 0) {
        movieData.genres = this.state.defaultSelectedGenres.map(genre => (genre.label).trim());
      }
      else { movieData.genres = this.state.genresUpdated }

      axios.post(
        `${baseUrl}admin/update`,
        movieData,
        {
          headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.props.fetchData();
            this.setState({ showAlert: true })
          }
          else {
            this.setState({
              showAlert: true, alertHeading: 'Please check your data',
              alertMessage: 'Try again with valid data'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  render() {
    return (
      <>
        <div className='adminTitle'>
          <span className='goBack' onClick={() => this.props.goBack()}>
            <svg width="18" height="30" viewBox="0 0 6 10" xmlns="http://www.w3.org/2000/svg">
              <polyline points="5,1 1,5 5,9" style={{ stroke: '#333', strokeWidth: '0.8', strokeLinejoin: "round", strokeLinecap: "round", fill: "#fff" }}></polyline>
            </svg>
          </span>
          Edit Your Data Here!
        </div>
        <div>
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
        </div>
        <div>
          {
            formData.map(data => {
              return (
                <Form.Group as={Row} key={data.name}>
                  <Form.Label column sm='3'>
                    {data.title}
                  </Form.Label>
                  <Col sm='6'>
                    <Form.Control as={data.as}
                      className='formValues'
                      type='input'
                      value={this.state[data.name]}
                      placeholder={this.state[data.name]}
                      name={data.name}
                      onChange={this.handleChange}
                    >
                    </Form.Control>
                  </Col>
                </Form.Group>
              )
            })
          }
          <Form.Group as={Row} >
            <Form.Label column sm='3'>
              {'Actor'}
            </Form.Label>
            <Col sm='6'>
              <Form.Control
                className='formValues'
                type='input'
                ref={this.actorRef}
                value={this.state['actors']}
                placeholder={this.state['actors']}
                name={'actors'}
                onChange={this.handleChange}
              >
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} >
            <Form.Label column sm='3'>
              Language
            </Form.Label>
            <Col sm='6'>
              <Form.Control as={'select'}
                className='formValues'
                type='select'
                placeholder={this.state.language}
                name={'language'}
                onChange={this.handleChange}
              >
                {languageData.map((item) => {
                  return (<option key={item}
                  >{item}</option>)
                })}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formGridState">
            <Form.Label column sm='3'>
              Select genre
            </Form.Label>
            <Col sm='6'>
              <Select
                defaultValue={this.state.defaultSelectedGenres}
                options={this.state.genres}
                isMulti={true}
                onChange={e => this.genreHandler(e)}
                placeholder="All genres"
              />
            </Col>
          </Form.Group>
          <div>
            <Button onClick={() => this.saveMovie()}>{`${this.props.type.toUpperCase()} MOVIE`}</Button>
          </div>
        </div >
      </>
    );
  }
}

export default AddMovie;
