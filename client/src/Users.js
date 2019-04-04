import React, { Fragment } from 'react';
import axios from 'axios';

import requiresAuth from './requiresAuth';

class Users extends React.Component {
    state = {
        users: [],
    };

    render() {
        return (
            <Fragment>
                <h2>List of Users</h2>
                <ul>
                    {this.state.users.map(u => (
                        <li key={u.id}>{u.username}</li>
                    ))}
                </ul>
            </Fragment>
        );
    }

    componentDidMount() {
        const endpoint = `/users`;
        axios
            .get(endpoint)
            .then(res => {
                this.setState({ users: res.data });
            })
            .catch(error => {
                console.error('USERS ERROR', error);
            });
    }
}

export default requiresAuth(Users);
