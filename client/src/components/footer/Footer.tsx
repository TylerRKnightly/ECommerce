import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 pt-4 pb-2">
      <Container>
        <Row className="mb-3">
          <Col md={4}>
            <h5>Knightly Store</h5>
            <p className="text-muted small">Your one-stop shop for all things demo-related.</p>
          </Col>
          <Col md={4}>
            <h6>Links</h6>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-light text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
              <li><a href="/faq" className="text-light text-decoration-none">FAQ</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h6>Follow Us</h6>
            <ul className="list-unstyled d-flex gap-3">
              <li><a href="#" className="text-light">Twitter</a></li>
              <li><a href="#" className="text-light">Instagram</a></li>
              <li><a href="#" className="text-light">Facebook</a></li>
            </ul>
          </Col>
        </Row>
        <div className="text-center text-muted small">
          © {new Date().getFullYear()} Demo Site. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
