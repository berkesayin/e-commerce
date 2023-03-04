import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
  /* => stackoverflow
  const { id } = useParams();
  const { search } = useLocation();
  const [searchParams] = useSearchParams();
  const productID = id;
  const qty = search ? Number(search.split("=")[1]) : 1;
  console.log({ productID, qty, qtyParam: Number(searchParams.get("qty")) });
  */

  /*  => video
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  */

  const { id } = useParams();
  const productId = id;

  const { search } = useLocation();

  /* 
  const qty = search; 
  Bu şekilde URL'de ürün id'sinden sonraki query params bilgisi alınır. Örneğin bir üründen 2 miktarını ü
  seçip sepete eklediğimizde yönlendirilen URL'de /productId?qty=2 şeklinde gözükür. Console'da ise 
  query params olan ?qty=2 yazdırılır. Yani search ?qty=2 bilgisini tutar. 
  */

  const qty = search ? Number(search.split("=")[1]) : 1;
  /* 
  Burada ?qty=2 'yi = ile bölüp, eşittirin sağındaki number bilgisini yani 1.index'teki bilgiyi alıyoruz
  Çünkü bize quantity miktarı lazım. 
  */

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // console.log("Cart Items: ", cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  /*
  console.log('CartScreen: Product Id: ', productId)
  console.log('CartScreen: Quantity: ', qty)
  console.log('CartScreen: Cart: ', cart)
  console.log('CartScreen: Cart Items: ', cartItems)
 */

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  };

  const checkoutHandler = () => {
    console.log("checkout");
    // history.push('/login?redirect=shipping')
    // history.push yerine aşağıdaki çözüm kullanılmalı
    // https://stackoverflow.com/questions/70768227/redirect-react-router-dom-v6
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty! <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>{item.price}</Col>

                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
