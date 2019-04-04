import React, { Fragment, Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import './App.css';
import Login from './Login';
import Users from './Users';
import Register from './Register';


class App extends Component {
  render() {
    return (
      <Fragment>
        <div className="App">
          <header className="App-header">
            <NavLink to="/">Home</NavLink>
              &nbsp;|&nbsp;
            <NavLink to="/register">Register</NavLink>
              &nbsp;|&nbsp;
            <NavLink to="/login">Login</NavLink>
              &nbsp;|&nbsp;
            <NavLink to="/users">Users</NavLink>
              &nbsp;|&nbsp;
            <button onClick={this.logout}>Logout</button>
          </header>
        </div>
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/users" component={Users} />
          <Route path="/register" component={Register} />
        </main>
      </Fragment>
    );
  }
  logout = () => {
    localStorage.removeItem('token');
  };
}

function Home(props) {
  return <h1>Home Component</h1>;
}

export default App;
