import './AnswerItem.css'

function AnswerItem({ onClick, className, disabled, children }) {
  return (
    <li
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          onClick()
        }
      }}
      tabIndex={0}
      onKeyDown={event => {
        if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
          onClick()
        }
      }}
      className={className}
    >
      {children}
    </li>
  )
}

export default AnswerItem
