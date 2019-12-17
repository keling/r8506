import React, { Component } from 'react';

class Logout extends Component {
    componentDidMount() {
        const token = localStorage.usertoken
        if (token) {
            this.logout()
        }
    }

    logout() {
        localStorage.removeItem('usertoken')
        this.props.history.push('/login')
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Logout;