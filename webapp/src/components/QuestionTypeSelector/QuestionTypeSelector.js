import { useTranslation } from 'react-i18next'
import './QuestionTypeSelector.css'

const QuestionTypeSelector = ({ onChange, selectedTypes, types }) => {
  const { t } = useTranslation()

  return (
    <div className="question-type-selector">
      <h3>{t('play.gamemode.custom.questionTypesTitle')}</h3>
      <div>
        {types.map(type => (
          <label key={type}>
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => onChange(type)}
            />
            {t(`play.gamemode.custom.questionTypes.${type}`)}
          </label>
        ))}
      </div>
    </div>
  )
}

export default QuestionTypeSelector
