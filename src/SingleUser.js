import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import User from './User';

class SingleUser extends Component {
    
    state = {
        user: [],
    };

    componentDidMount() {
        // const url = '../users.php/' + this.props.match.params.id;
        const url = '../user.json';

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.props.getUser(res);
                this.setState({
                   user: res
                })
          });
    }

    render() { 
        return (
            <div className="d-flex">
                <User user={ this.state.user }></User>
            </div>
        );
    }
}
 
export default withRouter(SingleUser);