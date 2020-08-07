import React from 'react';
import { Container, Row, Carousel, Col, Image } from 'react-bootstrap';
import '../styles/ShowData.css';
function ShowData(props) {
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
	}]
	return (

		<div className="row showDataContainer">
			<div className='row searchTitle'>
				Showing 1 – 40 of 29,969 results for SALMAN KHAN
                </div>
			<div className='row sortTitle'>
				Sort By  Popularity Movie Name Director Name
            </div>
			<div className="row">
				{
					data.map((movie) => {
						return (<div className='showImage'>
							<Image rounded src={require('../images/P1.jpg')} />
							<div>
								Rating:{movie.rating}
							</div>

						</div>)
					})
				}
			</div>
		</div>

	);
}

export default ShowData;





