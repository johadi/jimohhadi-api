import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal } from './partials';

export default class AdminDashboard extends React.Component {

  state = {
    messages: [],
    viewingMessage: {},
    isLoading: true
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    axios.get('/api/messages', { headers: { Authorization: token } })
      .then((response) => {
        // redirect user here
        this.setState({ isLoading: false, messages: response.data });
      })
      .catch((error) => {
        if (error) {
          this.removeTokenAndredirect();
        }
      });
  }

  viewMessage = (message) => {
    this.setState({ viewingMessage: message });
  }

  logout = () => {
    this.removeTokenAndredirect();
  }

  removeTokenAndredirect = () => {
    localStorage.removeItem('token');
    this.props.history.push('/admin');
  }


  render() {
    return !this.state.isLoading ? (
      <div className="container">
        <div className="row" style={{marginTop: '20px'}}>
          <button onClick={this.logout} className="btn btn-primary pull-right">Logout</button>
        </div>
        <div className="row dashboard-wrapper">
          <div className="col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1 panel-custom panel panel-default">
            {
              this.state.messages.map((message) => (
                <React.Fragment key={message._id}>
                  <div className="media">
                    <div className="media-left">
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">{message.name}</h4>
                      <a onClick={() => this.viewMessage(message)} data-toggle="modal"
                         href="#myModal">{message.subject}</a>
                    </div>
                  </div>
                  <hr/>
                </React.Fragment>
              ))
            }
          </div>
          <Modal message={this.state.viewingMessage}/>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}
