import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      
      const item = action.payload;
      
      /*
      console.log('Reducer file: Item: ', item);
      console.log('Reducer file: item.product: ', item.product);
      console.log("Reducer file: state.cartItems: ", state.cartItems);
      console.log('Reducer file: action: ', action);
      console.log('Reducer file action.type: ', action.type);
      console.log('Reducer file: action.payload: ', action.payload);
      */
            
      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        return {  
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x  
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;  
   }
};
