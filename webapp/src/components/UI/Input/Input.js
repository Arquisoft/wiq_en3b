import "./Input.css";

const Input = (props) => {
  return (
    <div className="form-control">
      <label htmlFor={props.label}>{props.label}</label>
      <input type="text" id={props.label} onChange={props.onChange} />
    </div>
  );
};

export default Input;
