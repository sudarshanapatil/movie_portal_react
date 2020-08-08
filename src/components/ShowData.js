import React from 'react';
import Select from 'react-select';
import { Form, Col } from 'react-bootstrap';
import '../styles/ShowData.css';
let genre = [
  { value: 'All Genres', label: 'All Genres' },
  { value: 'Comedy', label: 'Comedy', },
  { value: 'Action', label: 'Action', },
  { value: 'Horror', label: 'Horror' }
];
let data = [{
  'id': 'hghghg',
  "movieName": "Men in Black 3 ",
  "director": "Barry Sonnenfeld",
  "rating": "6.8",
  "actors": [
    "J.K. Simmons",
    "James Franco",
    "Kirsten Dunst"
  ],
  "releaseYear": "2012",
  "language": "English",
},
{
  'id': 'hghghgjj',
  "movieName": "Men in Black 3 ",
  "director": "Barry Sonnenfeld",
  "rating": "6.8",
  "releaseYear": "2012",
  "actors": [
    "J.K. Simmons",
    "James Franco",
    "Kirsten Dunst"
  ],
  "language": "English",
},
{
  'id': 'hghghghgh',
  "movieName": "Men in Black 3 ",
  "director": "Barry Sonnenfeld",
  "rating": "6.8",
  "releaseYear": "2012",
  "language": "English",
  "actors": [
    "J.K. Simmons",
    "James Franco",
    "Kirsten Dunst"
  ],
},
{
  'id': 'hghghg34345656',
  "movieName": "Men in Black 3 ",
  "director": "Barry Sonnenfeld",
  "rating": "6.8",
  "releaseYear": "2012",
  "language": "English",
  "actors": [
    "J.K. Simmons",
    "James Franco",
    "Kirsten Dunst"
  ],
},
]
const baseUrl = 'http://localhost:4000/';
class Movies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: data,
      sort: '',
      filter: [],
      search: ''
    }
  }
  handleChange = (event) => {
    let limit = 10;
    let skip = 0;
    console.log('in handle', event.target.value, event.target.name)
    if (event.target.name === 'filter')
      this.state.filter.push(event.target.value)
    else
      this.setState({ [event.target.name]: event.target.value })
    console.log(this.state)
    let filterQuery = {
      "genres": this.state.filter,
      "sortField": this.state.sort,
      "order": 0,
      "search": this.state.search,
      "skip": skip,
      "limit": limit
    }
    console.log(filterQuery, "qww")
    fetch(`${baseUrl}filter`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filterQuery)
    })
      .then(res => res.json())
      .then((res) => {
        if (res) {
          this.setState({ movie: res })
        }
        console.log("after adding")
      })
      .catch(err => { })


  }
  render() {
    return (
      <div className="row showDataContainer">
        <div className='row searchTitle'>
          Showing 1 – 40 of 29,969 results for SALMAN KHAN
        </div>
        <div className='row'>
          <div className='col sortTitle'>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Sort By</Form.Label>
              <Form.Control as="select" defaultValue="Choose..."
                name='sort'
                onChange={this.handleChange}>
                <option value='popularity'>Popularity</option>
                <option value='movieName'>Movie Title A-Z</option>
                <option value='movieName'>Movie Title Z-A</option>
                <option value='directorName'>Director Name A-Z</option>
                <option value='directorName'>Director Name Z-A</option>
              </Form.Control>
            </Form.Group>
            {/* Sort By  Popularity Movie Name Director Name */}
          </div>
          <div className='col'>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Select genre</Form.Label>
              <Form.Control as="select" defaultValue="Choose..." name='filter'
                onChange={this.handleChange}>
                <option>Comedy</option>
                <option>Action</option>
                <option>Horror</option>
                <option>Rommance</option>
                <option>Drama</option>
              </Form.Control>
            </Form.Group>
          </div>

        </div>
        <div className="row movie-data-container">
          {
            this.state.movie.map((movie) => {
              return (
                <div className='row image-card' key={`${movie.id}`}>
                  <div className='col image-card-container'>
                    <img style={{
                      width: "50%",
                      height: "80%",
                      // margin:"1%"
                    }}
                      src={require('../images/movie1.jpg')}></img>
                  </div>
                  <div className='col movie-metadata'>
                    {movie.movieName}{`(${movie.releaseYear})`}
                  </div>
                  <div className='col movie-metadata'>
                    {movie.actors}
                  </div>
                  <div className='col movie-metadata'>
                    Rating:{movie.rating}
                  </div>
                </div>)
            })
          }
        </div>
        <button>
          Load more
        </button>
      </div>
    );
  }
}

export default Movies;
