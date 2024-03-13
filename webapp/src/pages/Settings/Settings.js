import "./Settings.css";

const Settings = (props) => {
  return (
    <div className="settings">
      <h1>Settings</h1>

      <label htmlFor="selectTimer">Change timer second</label>
      <select
        name=""
        id="selectTimer"
        onChange={props.onChangeTimerValue}
        value={props.timerValue}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="60">60</option>
      </select>
    </div>
  );
};

export default Settings;
