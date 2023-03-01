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
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";


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

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

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

  return <div>Cart Screen Berke</div>;
};

export default CartScreen;
