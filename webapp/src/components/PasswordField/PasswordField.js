import { useState } from 'react'

import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

import './PasswordField.css'

const PasswordField = ({ placeholder, password, setPassword }) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="input-box">
            <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder={placeholder}
                onChange={e => setPassword(e.target.value)}
                value={password}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
            </button>
        </div>
    );
}

export default PasswordField;