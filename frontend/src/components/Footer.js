// rafce + enter: react arrow function component export shortcut
import React from "react";

// importing components from react-bootstrap
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Online Store
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
