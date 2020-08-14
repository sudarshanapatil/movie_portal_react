import React from 'react';
import { Form, Col } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select'

import '../styles/ShowData.css';
import conf from '../conf.json';
import genres from '../global.json';
const baseUrl = conf.production.baseUrl;
class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: this.props.location.movies || [],
      sortField: this.props.location.sortField || "rating",
      order: -1,
      filter: [],
      search: this.props.location.searchData || "",
      skip: this.props.location.skip || 0,
      limit: this.props.location.limit || 10,
      genres: genres.genres,
      loadMore: false
    }
  }

  componentDidMount() {
    this.fetchData(false);
  }

  fetchData(replace) {
    let { sortField, order, filter, search, skip, limit, loadMore } = this.state;
    if (replace) {
      skip = 0;
    }
    let data = {
      skip,
      limit
    };
    if (search) {
      data['search'] = search;
    }
    if (sortField) {
      data['sortField'] = sortField;
      data['order'] = order;
    }
    if (filter.length) {
      data['genre'] = filter;
    }
    axios.post(`${baseUrl}filter`, data).then((response) => {
      let movies = [];
      if (replace) {
        movies = response.data.data
      } else {
        movies = [...this.state.movies, ...response.data.data]
      }
      let newSkip = skip + limit;
      if (response.data.count < newSkip)
        loadMore = false
      else
        loadMore = true
      this.setState({
        movies,
        loadMore,
        skip: newSkip
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.searchData !== this.props.location.searchData) {
      this.setState({
        search: this.props.location.searchData
      }, () => this.fetchData(true))
    }
  }

  sortHandler(e) {
    const data = e.value.split('_');
    const sortField = data[0];
    const order = data[1] || -1;
    this.setState({
      sortField,
      order: parseInt(order)
    })
  }

  genreHandler(e) {
    let filter = [];
    if (e) {
      filter = e.map(data => data.value)
    }
    this.setState({
      filter
    })
  }

  closeSearch() {
    this.setState({ search: '' }, () => this.fetchData(true));
    this.props.location.emptySearch();
  }

  render() {
    return (
      <div className="row showDataContainer">
        {this.state.search &&
          <div className='searchTitle' onClick={() => this.closeSearch()}>
            <span className="search-title-container">
              Showing results for "{this.state.search}"
              <span className="close-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" enable-background="new 0 0 40 40">
                  <line x1="15" y1="15" x2="25" y2="25" stroke="#ff0000" stroke-width="2.5" stroke-linecap="round" stroke-miterlimit="10"></line>
                  <line x1="25" y1="15" x2="15" y2="25" stroke="#ff0000" stroke-width="2.5" stroke-linecap="round" stroke-miterlimit="10"></line>
                  <circle className="circle" cx="20" cy="20" r="12" opacity="1" stroke="#ff0000" stroke-width="2.5" stroke-linecap="round" stroke-miterlimit="10" fill="none"></circle>
                </svg>
              </span>
            </span>
          </div>
        }
        <div className='row' id='desktop-filter'>
          <div className='col'>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label style={{ color: "white" }}>Sort By</Form.Label>
              <Select
                options={[
                  {
                    value: 'rating', label: 'Popularity'
                  }, {
                    value: 'movieName_1', label: 'Movie Title A-Z'
                  }, {
                    value: 'movieName_-1', label: 'Movie Title Z-A'
                  }, {
                    value: 'director_1', label: 'Director Name A-Z'
                  }, {
                    value: 'director_-1', label: 'Director Name Z-A'
                  }
                ]}
                defaultValue={{
                  value: 'rating', label: 'Popularity'
                }}
                onChange={e => this.sortHandler(e)}
              />
            </Form.Group>
          </div>
          <div className='col'>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label style={{ color: "white" }}>Select genre</Form.Label>
              <Select
                options={this.state.genres}
                isMulti={true}
                onChange={e => this.genreHandler(e)}
                placeholder="All genres"
              />
            </Form.Group>
          </div>
          <div className='col-2'>
            <button
              className="btn btn-primary filter-button"
              onClick={() => this.fetchData(true)}
            >Filter</button>
          </div>
        </div>
        <div className="row movie-data-container">
          {
            this.state.movies.map((movie) => {
              return (
                <div className='row image-card' key={`${movie._id}`}>
                  <div className='col image-card-container'>
                    <img className='homeMovieImage'
                      alt='image'
                      src={require(`../images/movie${Math.floor(Math.random() * 6) + 1}.jpg`)}>
                    </img>
                  </div>
                  <div className='col movie-metadata movieName'>
                    {movie.movieName}{`(${movie.releaseYear})`}
                  </div>
                  <div className='col-2 movie-metadata'>
                    <p><b>Actors</b></p>
                    {movie.actors.join(', ')}
                  </div>
                  <div className='col-1 movie-metadata'>
                    <p><b>Rating</b></p>
                    <img className='starImage'
                      alt='hjh'
                      src={require(`../images/star.png`)}></img>
                    {movie.rating}
                  </div>
                  <div className='col-2 movie-metadata'>
                    <p><b>Genre</b></p>
                    {movie.genres.join(', ')}
                  </div>
                  <div className='col movie-metadata'>
                    <p><b>Director</b></p>
                    <p>{movie.director}</p>
                  </div>
                </div>)
            })
          }
        </div>
        {
          this.state.loadMore &&
          <button className='loadMoreButton' onClick={() => this.fetchData(false)}>
            Load more
        </button>
        }
      </div>
    );
  }
}

export default Movies;
