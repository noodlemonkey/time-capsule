import React from 'react';
import MessageInput from './MessageInput.js';
import TimeInput from './TimeInput.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
      buriedTime: { hours: 0, minutes: 0, seconds: 0 },
    };
    this.handleMessage = this.handleMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleSecond = this.handleSecond.bind(this);
    this.handleMinute = this.handleMinute.bind(this);
    this.handleHour = this.handleHour.bind(this);
  }

  handleMessage(event) {
    const message = event.target.value;
    this.setState({
      ...this.state,
      message,
    });
  }

  handleSecond(event) {
    const seconds = parseInt(event.target.value, 10);
    this.setState({
      ...this.state,
      buriedTime: {
        ...this.state.buriedTime,
        seconds,
      },
    });
  }

  handleMinute(event) {
    const minutes = parseInt(event.target.value, 10);
    this.setState({
      ...this.state,
      buriedTime: {
        ...this.state.buriedTime,
        minutes,
      },
    });
  }

  handleHour(event) {
    const hours = parseInt(event.target.value, 10);
    this.setState({
      ...this.state,
      buriedTime: {
        ...this.state.buriedTime,
        hours,
      },
    });
  }

  sendMessage(event) {
    event.preventDefault();
    fetch('/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: this.state.message,
        buriedTime: this.state.buriedTime,
      }),
    });
  }

  componentDidMount() {
    setInterval(() => {
      console.log('setinterval');
      fetch('/check')
        .then((response) => response.json())
        .then((message) => {
          alert(message);
        })
        .catch((err) => {});
    }, 5000);
  }

  render() {
    return (
      <div id="app">
        <label>Text:</label>
        <br />
        <MessageInput
          message={this.state.message}
          handleMessage={this.handleMessage}
        />
        <br />
        <TimeInput
          handleSecond={this.handleSecond}
          handleMinute={this.handleMinute}
          handleHour={this.handleHour}
        />
        <br />
        <button onClick={this.sendMessage}>ENTER</button>
      </div>
    );
  }
}

export default App;
