import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../styles/Carousel.css'

let carouselData = [{
  id: 1,
  image: require('../images/banner1.jpg'),
  text: "1"
},
{
  id: 2,
  image: require('../images/banner2.jpg'),
  text: "1"
},
{
  id: 3,
  image: require('../images/banner3.jpg'),
  text: "1"
}];

function CarousalHome() {
  return (
    <Carousel>
      {carouselData.map(item => {
        return (
          <Carousel.Item key={item.id}>
            <img style={{
              width: "100%",
              height: "50%"
            }}
              src={item.image}
              alt={item.text}
            />
          </Carousel.Item>
        )
      })}
    </Carousel>
  );
}

export default CarousalHome;





