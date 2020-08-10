import React from 'react';
import axios from 'axios';

import Carousal from './Carousal';
import '../styles/Home.css'
import '../styles/Home.css'
import conf from '../conf.json';

const baseUrl = `${conf.production.baseUrl}filter`;

const homePageLists = [{
  title: "What's new",
  content: [],
  sortField: 'releaseYear'
}, {
  title: 'Popular Movies',
  content: [],
  sortField: 'rating'
},
{
  title: 'Best In Action',
  content: [],
  genre: 'Action'
}, {
  title: 'Happy Birthday Brad Pitt!',
  content: [],
  search: 'Brad Pitt'
},
{
  title: 'Hollywood Comedy Movies',
  content: [],
  genre: 'Comedy'
}];

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryData: homePageLists
    }
  }

  getListContent(data, index) {
    const limit = 7;
    const offset = 0;
    const params = {
      limit,
      offset
    }
    if (data['sortField']) {
      params['sortField'] = data['sortField'];
    }
    if (data['search']) {
      params['search'] = data['search'];
    }
    return axios.post(baseUrl, params).then((response) => {
      let categoryData = this.state.categoryData.map(function (categoryItem, i) {
        const obj = { ...categoryItem }
        if (i === index) {
          obj['content'] = response.data.data;
        }
        return obj;
      });
      this.setState({
        categoryData,
      });
    })
      .catch(() => {
        let categoryData = this.state.categoryData.filter(function (categoryItem, i) {
          if (i === index) {
            return false;
          }
          return true;
        });
        this.setState({
          categoryData,
        });
      })
  }

  componentDidMount() {
    Promise.all(this.state.categoryData.map((categoryItem, i) => this.getListContent(categoryItem, i)))
  }

  render() {
    return (
      <div className="container">
        <div className='row'>
          <Carousal />
        </div>
        {this.state.categoryData.filter(categoryItem => categoryItem.content.length !== 0).map((categoryItem) => {
          return (
            <div className="category" key={categoryItem.title}>
              <h3>{categoryItem.title}</h3>
              <div className="category-list">
                {categoryItem.content.map((content) => (
                  <div className="category-list-item" key={content._id}>
                    <img
                      className="category-list-item-img"
                      src={require(`../images/movie${Math.floor(Math.random() * 6) + 1}.jpg`)}
                    >
                    </img>
                    <p style={{color:'white'}}>{content.movieName}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Home;
