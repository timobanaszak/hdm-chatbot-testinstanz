import React, { useEffect, useState } from 'react';
import loadIcon from '../img/loader.svg';

const config = require('../config/config.json');

const SpreadSheetTable = (props) => {

  const [spreadSheetData, setSpreadSheetData] = useState('');

  const Tabletop = require('tabletop');
  const publicSpreadsheetUrl = config.googleSheetURL;

  const getSpreadSheetData = () => {
    console.log('fetching google sheet...')
    Tabletop.init({
      key: publicSpreadsheetUrl, 
      callback: saveInfo, 
      simpleSheet: false 
    })
  }
  
  const saveInfo = (data, tabletop) => {
    console.log('received google sheet')
    setSpreadSheetData(data.dialogflow.elements)    
  }
  
  useEffect( () => {
    const interval = setInterval(() => {
      console.log('refetching google sheet')
      getSpreadSheetData();
    }, 60000);
    return () => clearInterval(interval);
  }, [])

  return(
    <>
    {
      spreadSheetData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th className="idCol">#</th>
              <th className="intentCol">Intent</th>
              <th className="questionCol">Training Phrases</th>
              <th className="answerCol">Response</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(spreadSheetData).map((keyName, i) => (
              spreadSheetData[keyName]["Getestet"] === "FALSE" && (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{spreadSheetData[keyName]["Name des Intents"]}</td>
                  <td><pre>{spreadSheetData[keyName]["Training Phrases"]}</pre></td>
                  <td>{spreadSheetData[keyName]["Response"]}</td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      ) : (
        <div className="sheetLoader">
          <img src={loadIcon}></img>
          <p>Empfange Google Sheet Daten</p>
        </div>
      )
    }
    </>
  ) 
}

export default SpreadSheetTable;