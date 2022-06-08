import { useContext, useEffect } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import CartItem from "./CartItem";

function Cart(props) {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    console.log(item);
    cartCtx.addItem({ ...item, amount: 1 });
  };
  useEffect(() => {
    console.log("useEffect triggered");
    if (false) {
      const localObj = {
        items: cartCtx.items,
        totalAmount: cartCtx.totalAmount.toFixed(2),
      };
      localStorage.setItem("items", JSON.stringify(localObj));
    }
    const obj ={items: cartCtx.items, totalAmount: cartCtx.totalAmount}
    localStorage.setItem("items", JSON.stringify(obj));
    
    console.log(JSON.parse(localStorage.getItem("items")));
  }, [cartCtx.items, cartCtx.totalAmount]);

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onClick}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClick}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
