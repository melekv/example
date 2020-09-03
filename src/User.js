import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class User extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            status: '',
            redirect: false
        };

        this.handleInfo = this.handleInfo.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleInfo() {
        this.setState(state => ({
            visible: !state.visible
        }));
    }

    handleDelete() {
        let url = '';
        if (this.props.index) {
            url = './users.php/' + this.props.user.id;
        } else {
            url = '../users.php/' + this.props.user.id;
        }

        fetch(url, {
            method: 'DELETE',
        })
        .then(() => this.setState({
            status: 'Usunięto!',
            redirect: true
        }));
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }

        return (
            <div className="m-3 p-3 bg-info" style={{ width: 270 + 'px' }}>
                <div>
                    { this.props.index ? <h1>{ this.props.index }</h1> : null}
                    <h4>
                        { this.props.index ? <Link
                            to={"/user/" + this.props.user.id}
                            className="text-secondary"
                        >
                            { this.props.user.name }
                        </Link> : this.props.user.name }
                    </h4>
                    <p>{ this.props.user.email }</p>
                </div>
                <div>
                    <button className="btn btn-dark mr-2" onClick={ this.handleInfo }>Info</button>
                    <button className="btn btn-dark mr-2" onClick={ this.handleDelete }>Usuń</button>
                    { this.props.index ? null : <Link className="btn btn-dark" to={ "/update/" + this.props.user.id} >Aktualizuj</Link> }
                </div>
                {this.state.visible === true && <p>{ this.props.user.info }</p> }
                <p>{ this.state.status }</p>
            </div>
        );
    }
}
 
export default User;