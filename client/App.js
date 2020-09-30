import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
      buriedTime: 'test',
    };
    this.handleMessage = this.handleMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  handleMessage(event) {
    const message = event.target.value;
    this.setState({
      ...this.state,
      message,
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
      }),
    });
  }

  render() {
    return (
      <div>
        <form id="inputfields">
          <label>Text:</label>
          <br />
          <textarea
            name="message"
            id="message"
            value={this.state.message}
            onChange={this.handleMessage}
          ></textarea>
          <br />
          <label>Seconds:</label>
          <input type="number" max="60" min="0" step="30"></input>
          <button onClick={this.sendMessage}>ENTER</button>
        </form>
      </div>
    );
  }
}

export default App;
