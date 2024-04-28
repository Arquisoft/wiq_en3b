import { useState } from 'react'

import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

import './PasswordField.css'

import { useTranslation } from "react-i18next";
const PasswordField = ({ password, setPassword }) => {

    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();

    return (
        <div className="input-box">
            <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder={t("register.password_placeholder")}
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