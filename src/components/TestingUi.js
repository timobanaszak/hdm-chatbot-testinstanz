import React, { Component } from 'react';
import Chatbot from './Chatbot';
import SheetTable from './SheetTable';

const config = require('../config/config.json')

class TestingUi extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  handleCallback = (childData) => {
    this.setState({
      data: [...this.state.data, JSON.parse(childData)]
    })
  }

  render() {
    const responses = this.state.data;

    const getIntentLink = (intentName) => {
      let splittedIntentName = intentName.split('/')
      let intentId = splittedIntentName[splittedIntentName.length-1]
      let intentLink = config.dfEditIntentURL + intentId + '/'
      return intentLink;
    }

    return (
      <>
        <div className="column googleSheetsTable">
          <SheetTable/>
        </div>
        <div className="column responseLogs">
          <ul className="intentAusloeser">
          {responses.map( (response, index) => (
            <li key={index}>
              Anfrage <span className="color--secondary">{response.queryResult.queryText}</span> löst Intent <span className="color--primary"><a target="_blank" href={getIntentLink(response.queryResult.intent.name)}>{response.queryResult.intent.displayName}</a></span> aus. <a href={config.dfTrainingURL} target="_blank">Zum Training</a>.
            </li>
          ))}
          </ul>
        </div>
        <div className="column chatbotDummy">
          <Chatbot parentCallback={ this.handleCallback }/>
        </div>
      </>
    )
  }
}

export default TestingUi;