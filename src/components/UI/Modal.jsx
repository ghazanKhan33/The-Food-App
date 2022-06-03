import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
}

function ModalOverlays(props) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, document.getElementById("overlays"))}
      {ReactDOM.createPortal(
        <ModalOverlays>{props.children}</ModalOverlays>,
        document.getElementById("overlays")
      )}
    </>
  );
}

export default Modal;
