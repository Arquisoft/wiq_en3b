import './Button.css'

const Button = ({
  onClick,
  type,
  className = '',
  disabled = false,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type || 'button'}
      className={`button ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
