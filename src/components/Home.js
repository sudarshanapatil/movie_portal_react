import React from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import NavbarComp from './Navbar';
import Carousal from './Carousal';
import '../styles/Home.css'

import '../styles/Home.css'
let data = [{
    "movieName": "Men in Black 3 ",
    "director": "Barry Sonnenfeld",
    "rating": "6.8",
    "releaseYear": "2012",
    "language": "English",
},
{
    "movieName": "Men in Black 3 ",
    "director": "Barry Sonnenfeld",
    "rating": "6.8",
    "releaseYear": "2012",
    "language": "English",
},
{
    "movieName": "Men in Black 3 ",
    "director": "Barry Sonnenfeld",
    "rating": "6.8",
    "releaseYear": "2012",
    "language": "English",
},
{
    "movieName": "Men in Black 3 ",
    "director": "Barry Sonnenfeld",
    "rating": "6.8",
    "releaseYear": "2012",
    "language": "English",
},
{
    "movieName": "Men in Black 3 ",
    "director": "Barry Sonnenfeld",
    "rating": "6.8",
    "releaseYear": "2012",
    "language": "English",
},
{
    "movieName": "Men in Black 3 ",
    "director": "Barry Sonnenfeld",
    "rating": "6.8",
    "releaseYear": "2012",
    "language": "English",
},
{
    "movieName": "Men in Black 3 ",
    "director": "Barry Sonnenfeld",
    "rating": "6.8",
    "releaseYear": "2012",
    "language": "English",
},
]
function Home() {
    return (
        <>
            <div className='row'>
                <Carousal />
            </div>
            <div className='row homeList'>
                <div className='row listTitle'>
                    Popular Movies
                </div>
                <div className='row'>
                    {
                        data.map((movie) => {
                            return (<div className='showImage'>
                                <Image rounded src={require('../images/P2.jpg')} />
                                <div>
                                    Rating:{movie.rating}
                                </div>

                            </div>)
                        })
                    }
                </div>
            </div>
            <div className='row homeList'>
                <div className='row listTitle'>
                    Latest Movies
                </div>
                <div className='row'>
                    {
                        data.map((movie) => {
                            return (<div className='showImage'>
                                <Image rounded src={require('../images/P3.jpg')} />
                                <div>
                                    Rating:{movie.rating}
                                </div>

                            </div>)
                        })
                    }
                </div>
            </div>

        </>
    );
}

export default Home;

