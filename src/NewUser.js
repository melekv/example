import React, { Component } from 'react';

class NewUser extends Component {

    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            info: '',
            status: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.persist();

        const name = event.target.id;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const url = './users.php';
        
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('email', this.state.email);
        formData.append('info', this.state.info);

        fetch(url, {
            method: 'POST',
            body: formData
        })
            //.then(response => response.json())
            .then(data => console.log(data));

        this.setState({ status: 'Zapisano!' });
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
                        value={ this.state.name }
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
                            value={ this.state.email }
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
                            value={ this.state.info }
                            onChange={ this.handleChange } />
                    </div>
                </div>
                <button className="btn btn-primary" type="submit">Zapisz</button>
                <p>{ this.state.status }</p>
            </form>
        );
    }
}
 
export default NewUser;