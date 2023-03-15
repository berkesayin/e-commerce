import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

const LoginScreen = () => {
  // component level states for email and password fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const { search } = useLocation();  // react-router-dom
  const navigate = useNavigate();    // react-router-dom

  const dispatch = useDispatch();    // react-redux

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  // const redirect = location.search ? location.search.split("=")[1] : '/'  // old version
  const redirect = search ? search.split("=")[1] : "/";
  // search for the url query string, split by = and index [1] means the right of the equal (=) sign
  // or for else it is just going to be /  
  
  // we want to redirect if we are already logged in
  // we don't want to be able to come to LoginScreen if we are already logged in
  useEffect(() => {
    // if userInfo exists we are logged in, because it's going to be null if we're not logged in
    if (userInfo) {
      // history.push(redirect)  // old version
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();  // we don't want page to refresh
    // DISPATCH LOGIN ACTION
    dispatch(login(email, password))
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br/>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
