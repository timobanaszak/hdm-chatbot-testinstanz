import React, { Component, useCallback } from 'react';
import axios from 'axios';
import sendIcon from '../img/send.svg';

const config = require('../config/config.json')

const webdemoUrl = config.dfWebdemoURL;

class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [
        { message: 'Hi. Das ist die Testinstanz. Du kannst hier einfach Fragen eingeben oder welche aus der Tabelle einfügen.', type: 'bot' },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value })
  }

  handleSubmit = (event) => {
    // add the message to the chat
    const newMessage = { message: this.state.message, type: 'customer' };
    this.setState({
      messages: [...this.state.messages, newMessage]
    });

    console.log(webdemoUrl)
    // request to chatbot
    axios.post(
      webdemoUrl,
      '{"queryInput":{"text":{"text":"' + this.state.message + '","languageCode":"de"}}}',
      { headers: { "Content-Type": "application/json" } },
      useCallback
    )
      .then(response => {
        console.log(response);
        // Replace strange string, parse to JSON, I do not know why the f*ck this string is added to the response...
        let chatbotResponse = JSON.parse(response.data.replace(")]}'", ''));
        let chatResponses = chatbotResponse.queryResult.fulfillmentMessages;
        chatResponses.map((chatResponse, index) => (
          this.setState({ messages: [...this.state.messages, { message: chatResponse.text.text[0], type: 'bot' }] }),
          this.props.parentCallback(JSON.stringify(chatbotResponse))
        ));
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({ message: '' })
    // prevent page reload
    event.preventDefault()
  }

  render() {
    return (
      <div className="chatbot">
        <div className="chatbot__messages">
          <ul>
            {this.state.messages.map((message, index) => (
              <li className={message.type === 'customer' ? 'chatbot__message chatbot__message--customer' : 'chatbot__message chatbot__message--bot'} key={index}>
                <span>{message.message}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="chatbot__input">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="message"
              placeholder='Frage stellen' value={this.state.message} onChange={this.handleChange} />
            <button><img src={sendIcon} alt="Senden" /></button>
          </form>
        </div>
      </div>
    )
  }
}

export default Chatbot;