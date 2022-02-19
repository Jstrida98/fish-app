import React from 'react'
import { func, string } from 'prop-types';

const Toggle = ({theme,  toggleTheme }) => {

    return (  
        <label className="switch">
          <input onChange={() => void 0} checked={theme === 'dark'} type="checkbox" />
          <span onClick={() => toggleTheme()} className="slider round"></span>
        </label>
    );
};
Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}
export default Toggle;