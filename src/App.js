import { useEffect, useState } from 'react';
import {ThemeProvider} from "styled-components";
import { lightTheme, darkTheme } from "./themes"
import { GlobalStyles } from './globalStyles';
import { useDarkMode } from './useDarkMode';
import './App.css';
import DarkLightModeToggle from './toggler'
import getFish from './api'
import Tooltip from "@material-ui/core/Tooltip"
import { makeStyles } from '@material-ui/core/styles';
import parse from 'html-react-parser'


function App() {

  const [fish, setFish] = useState([]);
  const [selectedFish, setSelectedFish] = useState({});
  const [fishIndex, setFishIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [indexInput, setIndexInput] = useState(0);
  const maxApiResult = 20;

  const [theme, themeToggler, mountedComponent] = useDarkMode()

  const useStyles = makeStyles({
    tooltip: {
      fontSize: "16px",
    },
  });

  const classes = useStyles()

  const arr = []
  for (let i = 0; i < maxApiResult; i++) {
    arr.push(i);
  }
  
  useEffect(() => {
    getFish(maxApiResult).then((res) => {
      setFish(Array.from(res));
      setSelectedFish(res[fishIndex])
    })
    .catch(e => console.log(e + ' and error'));
  
  }, []);

  useEffect(() => { 
    setSelectedFish(fish[fishIndex])
  }, [fish,fishIndex]);


  const getCurrentPages = () => {
    // check for out of bounds
    const endPage = (pageIndex + 10 > maxApiResult ? (maxApiResult) : pageIndex + 10)
    const newArr = arr.slice(pageIndex, endPage);
    return newArr;
  }

  const handleButtonClick = (right=true) => {
    if (right) {
      const newRightIndex = (fishIndex + 1 >= maxApiResult ? 0 : fishIndex + 1);
      setFishIndex(newRightIndex)
      setIndexInput(newRightIndex)
      if (newRightIndex % 10 === 0) {
        setPageIndex(newRightIndex);
      }
    } else {
      const newLeftIndex = (fishIndex - 1 < 0 ? maxApiResult-1 : fishIndex - 1);
      setFishIndex(newLeftIndex);
      setIndexInput(newLeftIndex);
      console.log('newLeftIndex = ' + newLeftIndex);
      if (newLeftIndex % 10 === 9 && newLeftIndex >= 9) {
        setPageIndex(newLeftIndex-9);
      }
    }
    setSelectedFish(fish[fishIndex]);
  };

  const handleRandom = (min=0, max=maxApiResult-1) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const ran = Math.floor(Math.random() * (max - min + 1)) + min;
    setFishIndex(ran)
  };

  const handleGoToStart = () => {
    setFishIndex(0);
    setIndexInput(0)
    setPageIndex(0);
  }
  
  const handleGoToEnd = () => {
    const newIndex = maxApiResult-1;
    setFishIndex(newIndex);
    setIndexInput(newIndex)

    console.log('newIndex = ' + newIndex + ' maxApiResult = ' + maxApiResult + ' pageIndex = ' + pageIndex);

    
    setPageIndex(newIndex-9 < 10 ? 10 : newIndex - 9);
  }

  const handleInputChange = (evt) => {
    evt.preventDefault();
    const index = Number(evt.target.value) - 1;
    setIndexInput(index);
    console.log(evt.target.value);
  }

  const handleInputSubmit = () => {
    setFishIndex(indexInput);
  }

  const handlePaginationClick = (i) => {
    setFishIndex(i);
    setIndexInput(i);
  }

 if(!mountedComponent) return <div/>

  return (

    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles/>
        <div className="App">
          <div className="fish-app-content">
            { selectedFish && <div className="fish-border">
              <div>
              <div className="options">
                <div className="dark-light-toggle">
                  <DarkLightModeToggle theme={theme} toggleTheme={themeToggler} />
                </div>
              </div>
                <h2>{selectedFish.species}</h2>
                <div className="search-bar">
                  <input onChange={(evt) => handleInputChange(evt)} type="text" value={indexInput+1} />
                  <button type="submit" onClick={() => handleInputSubmit()}>Go</button>
                </div>
              </div>
              <div>
                <img className="image-border" key={selectedFish.species} alt="Fish Species" src={selectedFish.img} />
              </div>
                <div className="buttons-row">
                  <div className="button-set">
                    <Tooltip classes={{tooltip: classes.tooltip}} title="Go To Start">
                      <button onClick={() => handleGoToStart()}>{'<<'}</button>
                    </Tooltip>
                    <Tooltip classes={{tooltip: classes.tooltip}} title="Previous">
                      <button onClick={() => handleButtonClick(false)}>{'<'}</button>
                    </Tooltip>
                  </div>
                  <div className="pagination">
                    {getCurrentPages().map((i) => {
                      return <><span>{`${i % 10 > 0 ? '|' : ''}`}</span><span className={`pagination-element ${i === fishIndex ? 'selected-page' : ''}`} onClick={() => handlePaginationClick(i)}>{`${i+1}`}</span></>
                    })}
                  </div>
                  <div className="button-set">
                  <Tooltip classes={{tooltip: classes.tooltip}} title="Next">
                    <button onClick={() => handleButtonClick()}>
                      {'>'}
                    </button>
                    </Tooltip>
                    <Tooltip classes={{tooltip: classes.tooltip}} title="Go To End">
                    <button onClick={() => handleGoToEnd()}>
                      {'>>'}
                    </button>
                    </Tooltip>
                  </div>
                </div>
                {selectedFish.facts &&
                <div className="fish-facts-container">
                  <h2>Quick Facts</h2>
                  {Object.keys(selectedFish.facts).map((key) => {
                    if (!selectedFish.facts[key]) return '';
                    return (
                      <div className="fish-fact">
                        <strong><span>{key}:</span></strong>
                        <span>{parse(selectedFish.facts[key], {key: key})}</span>
                      </div>
                    )
                  })}
                </div>
                }
            </div>
            }
            {
              !selectedFish && 
              <h2>There is no selected fish</h2>
            }
          </div>
        </div>
      </ThemeProvider>
  );
}

export default App;
