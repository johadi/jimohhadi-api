import React from 'react';
import axios from 'axios';

export default class AdminPage extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    },
    errors: null,
    isLoading: false
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.history.push('/admin/dashboard');
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    axios.post('/api/login', this.state.credentials)
      .then((response) => {
        localStorage.setItem('token', response.data);
        this.props.history.push('/admin/dashboard');
      })
      .catch((error) => {
        this.setState({ isLoading: false, errors: error.response.data });
      });
  }

  handleChange = (event) => {
    const { credentials } = this.state;
    credentials[event.target.name] = event.target.value;
    this.setState({ credentials });
  }

  render() {
    const { errors, isLoading } = this.state;
    return (
      <div className="container">
        <div className="row admin-page-wrapper">
          <div
            className="col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1 panel-custom panel panel-default">
            <h3>Admin Login</h3>
            <form onSubmit={this.handleSubmit}>
              {
                errors && typeof errors === 'string'
                  ? <div id='error' className="alert alert-danger alert-dismissible">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">x</span>
                    </button>
                    { errors }
                  </div> : null
              }
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.credentials.username}
                  type="text"
                  name="username"
                  className="form-control"
                  id="username"
                  placeholder="Username"/>
                {
                  errors && errors.validationError
                    ? <span className="help-block text-danger text-error">{errors.validationError.username} </span> : null
                }
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.credentials.password}
                  name="password"
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"/>
                {
                  errors && errors.validationError
                    ? <span className="help-block text-danger text-error">{errors.validationError.password} </span> : null
                }
              </div>
              <button disabled={isLoading} type="submit" className="btn btn-primary btn-block btn-lg">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
