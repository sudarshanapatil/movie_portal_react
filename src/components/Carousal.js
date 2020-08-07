import React from 'react';
import { Container, Row, Carousel } from 'react-bootstrap';

let stylesheet = {
	"img-carousel": {
		width: "100vw",
		height: "60vh"
	}
}
function CarousalHome() {
	return (
		<>
			<Carousel>
				<Carousel.Item>
					<img
						// className={stylesheet["img-carousel"]}
						style={stylesheet["img-carousel"]}
						src={(require('../images/B1.jpg'))}
						alt="First slide"
					/>
					<Carousel.Caption>
						<h3>First slide label</h3>
						<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						style={stylesheet["img-carousel"]}
						src={(require('../images/B2.jpg'))}
						alt="Third slide"
					/>

					<Carousel.Caption>
						<h3>Second slide label</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						style={stylesheet["img-carousel"]}
						src={(require('../images/B3.jpg'))}
						alt="Third slide"
					/>

					<Carousel.Caption>
						<h3>Third slide label</h3>
						<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		</>
	);
}

export default CarousalHome;





