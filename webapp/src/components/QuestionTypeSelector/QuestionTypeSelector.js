import { capitalizeFirstLetter } from '../../utils/capitalize'
import './QuestionTypeSelector.css'

const QuestionTypeSelector = ({ onChange, selectedTypes, types }) => {
  return (
    <div className="question-type-selector">
      <h3>Select Question Types</h3>
      <div>
        {types.map(type => (
          <label key={type}>
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => onChange(type)}
            />
            {capitalizeFirstLetter(type)}
          </label>
        ))}
      </div>
    </div>
  )
}

export default QuestionTypeSelector
