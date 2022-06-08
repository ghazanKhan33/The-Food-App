import { useRef, useState, useContext } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import CartContext from "../../store/CartContext";

function MealItemForm(props) {
  const cartCtx = useContext(CartContext);
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const obj = {
      items: cartCtx.items,
      totalAmount: cartCtx.totalAmount,
    };
    localStorage.setItem("items", JSON.stringify(obj));

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label={"Amount"}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please Enter a value amount (1-5).</p>}
    </form>
  );
}

export default MealItemForm;
