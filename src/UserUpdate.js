import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class UserUpdate extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            info: '',
            status: '',
            change: {
                name: false,
                email: false,
                info: false
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const url = '../users.php/' + this.props.user.id;

        const data = {
            name: this.state.name === '' ? this.props.user.name : this.state.name,
            email: this.state.email === '' ? this.props.user.email : this.state.email,
            info: this.state.info === '' ? this.props.user.info : this.state.info
        }

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.text())
        .then(res => this.setState({ status: 'Zaaktualizowano poprawnie!' }));
    }

    handleChange(e) {
        e.persist();

        const name = e.target.id;
        const value = e.target.value;

        this.setState(prevState => ({
            [name]: value,
            change: {
                ...prevState.change,
                [name]: true
            }
        }));
    }

    render() { 
        return (
            <form className="p-5" onSubmit={ this.handleSubmit }>
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-1 col-form-label">Imię:</label>
                    <div className="col-sm-7">
                    <input
                        type="text"
                        id="name"
                        placeholder="Imię"
                        className="form-control"
                        value={ this.state.change.name === false ? this.props.user.name : this.state.name }
                        onChange={ this.handleChange } />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="email" className="col-sm-1 col-form-label">Email:</label>
                    <div className="col-sm-7">
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            className="form-control"
                            value={ this.state.change.email === false ? this.props.user.email : this.state.email }
                            onChange={ this.handleChange } />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="info" className="col-sm-1 col-form-label">Info:</label>
                    <div className="col-sm-7">
                        <input
                            type="text"
                            id="info"
                            placeholder="Info"
                            className="form-control"
                            value={ this.state.change.info === false ? this.props.user.info : this.state.info }
                            onChange={ this.handleChange } />
                    </div>
                </div>
                <button className="btn btn-primary" type="submit">Zapisz</button>
                <p>{ this.state.status }</p>
            </form>
        );
    }
}
 
export default withRouter(UserUpdate);