import React from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from './modal';

class App extends React.Component{
  state = {
    showModal: false,
  }

  modalStyle = {
      position: 'fixed',
      zIndex: 500,
      backgroundColor: 'white',
      width: '70%',
      padding: 16,
      left: '15%',
      top: '30%',
  }


  toggleModal = () => {
      this.setState({showModal: true});
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.toggleModal}>Show Modal</button>
        <Modal show={this.state.showModal}>
          <div>Content inside modal</div>
        </Modal>
      </div>
    );
  }
}

export default App;
