import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Home from './Home';
import NewUser from './NewUser';
import Nav from './Nav';
import SingleUser from './SingleUser';
import UserUpdate from './UserUpdate';
import { TransitionGroup } from 'react-transition-group';

class App extends Component {
    state = {
        user: []
    }

    userInfo = (user) => {
        this.setState({ user: user });
    };

    render() { 
        return (
            <Router>
                <Nav></Nav>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>

                        <Route path="/newuser">
                            <NewUser />
                        </Route>

                        <Route path="/user/:id" children={ <SingleUser getUser={ this.userInfo } /> } />

                        <Route path="/update/:id" children={ <UserUpdate user={ this.state.user } /> } />

                    </Switch>
            </Router>
        );
    }
}
 
export default App;