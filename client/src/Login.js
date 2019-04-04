import React, { Fragment } from 'react';
import axios from 'axios';

class Login extends React.Component {
    state = {
        username: 'sam',
        password: 'pass',
    };

    render() {
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="username" />
                        <input
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            id="username"
                            type="text"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" />
                        <input
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            id="password"
                            type="password"
                        />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </Fragment>
        );
    }

    handleSubmit = event => {
        event.preventDefault();
        const endpoint = 'http://localhost:3333/api/login';
        axios
            .post(endpoint, this.state)
            .then(res => {
                console.log('LOGIN RESPONSE', res);
                localStorage.setItem('token', res.data.token);
                if (res.status === 200) {
                    this.props.history.push('/')
                }
            })
            .catch(error => {
                console.error('LOGIN ERROR', error);
            });
    };

    handleInputChange = event => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    };
}

export default Login;
