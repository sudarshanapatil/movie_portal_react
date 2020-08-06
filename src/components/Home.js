import React from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import NavbarComp from './Navbar';
import Carousal from './Carousal';

import '../styles/Home.css'

function Home() {
    return (
        <>
            <Row>
                <Carousal />
            </Row>
            <Row style={{ margin: 20 }}>
                <Col>
                    <Image src={require('../images/P1.jpg')} />
                </Col>
                <Col>
                    <Image src={require('../images/P2.jpg')} />
                </Col>
                <Col>
                    <Image src={require('../images/P3.jpg')} />
                </Col>
                <Col>
                    <Image src={require('../images/P4.jpg')} />
                </Col>

            </Row>

        </>
    );
}

export default Home;

