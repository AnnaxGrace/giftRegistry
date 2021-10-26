import React from "react";
import { Link } from "react-router-dom";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";

import ShopImage from "../assets/jumboShop.png";
import Kaye from "../assets/kayeHeadshot.png";

// import "./scss/Landing.scss";

function LandingPage() {
  return (
    <main>
      <Jumbotron className="jumbo" fluid>
        <Container
        className="animate__animated animate__fadeIn ">
          <video
            width="100%"
            src="https://files.catbox.moe/2z9fp7.mp4"
            autoPlay
            loop
            muted
          ></video>
        </Container>
      </Jumbotron>
      <Jumbotron className="jumbo" fluid>
        <Container>
          <div className="shop-image">
            <img
              src={ShopImage}
              width="100%"
              alt="Fun collage of stickers you can buy"
            />
            <Nav.Link as={Link} to="/products">
              <Button id="shop-btn">Shop Now!</Button>
            </Nav.Link>
          </div>
        </Container>
      </Jumbotron>
      <Jumbotron className="jumbo" fluid>
        <Container>
          <Row>
            <Col md={3}>
              <Image
                src={Kaye}
                height="200px"
                alt="Kaye the artist headshot"
                roundedCircle
              />
            </Col>
            <Col md={9}>
              <p>
                Kaye Powell (aka Simkaye) is an illustrator & comic artist based
                in Los Angeles, California.
              </p>
              <p>
                Environmental sustainability is a chief priority. All shipping
                material (labels, outer packaging, print/sticker sleeves, etc.)
                is made from recycled and sustainable material by Ecoenclose.
              </p>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </main>
  );
}

export default LandingPage;
