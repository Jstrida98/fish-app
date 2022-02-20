import React from 'react'
import Brightness2 from '@material-ui/icons/Brightness2';
import WbSunny from '@material-ui/icons/WbSunny';
import { func, string } from 'prop-types';

const DarkLightModeToggle = ({theme,  toggleTheme }) => {

    return (
        <>
            <WbSunny />
                <label className="switch">
                    <input onChange={() => void 0} checked={theme === 'dark'} type="checkbox" />
                    <span onClick={() => toggleTheme()} className="slider round"></span>
                </label>
            <Brightness2 />
        </>
    );
};
DarkLightModeToggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}
export default DarkLightModeToggle;