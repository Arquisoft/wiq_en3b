import "./Button.css";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type || "button"}
      className={`button ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
