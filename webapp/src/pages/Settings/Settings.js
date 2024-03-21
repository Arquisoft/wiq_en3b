import { useSettings } from '../../hooks/useSettings'
import './Settings.css'

// From 10 to 50 with step of 5
const possibleTimeValues = new Array(9)
  .fill(0)
  .map((_, index) => 5 + (index + 1) * 5)

const Settings = () => {
  const { time, changeTimeTo } = useSettings()

  const handleTimeChange = e => {
    changeTimeTo(e.target.value)
  }

  return (
    <div className="settings">
      <h1>Settings</h1>

      <label htmlFor="selectTimer">Change timer second</label>
      <select name="" id="selectTimer" onChange={handleTimeChange} value={time}>
        {possibleTimeValues.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Settings
