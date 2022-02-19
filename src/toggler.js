import React, { useEffect } from 'react'
import { func, string } from 'prop-types';
import styled from "styled-components"
const Button = styled.button`
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: white;
  border-radius: 30px;
  cursor: pointer;
  font-size:0.8rem;
  padding: 0.6rem;
`;



const Toggle = ({theme,  toggleTheme }) => {

  useEffect(() => {
    if (theme === 'dark') {
      console.log('i should toggle');
  
    }
  });

    return (
        /*<Button onClick={toggleTheme} >
          {theme === 'light' ? 'Light' : 'Dark'} Mode
        </Button>*/
  
        <label className="switch">
          <input checked={theme === 'dark'} type="checkbox" />
          <span onClick={() => toggleTheme()} className="slider round"></span>
        </label>
    );
};
Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}
export default Toggle;