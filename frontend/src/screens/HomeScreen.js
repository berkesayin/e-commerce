// rafce + enter: react arrow function component export
import React from "react";

// importing components from react-bootstrap
import { Row, Col } from "react-bootstrap";

// importing products.js file (products array)
import products from "../products";

// importing Product component
import Product from "../components/Product";

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
