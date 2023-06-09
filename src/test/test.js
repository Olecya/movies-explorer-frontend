import React from 'react';
import { sendFormData } from '../services/';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled: true
        }
        this.submitForm = this.submitForm.bind(this);
    }
    validateEmail(email) {
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(email);
        if (result === true) {
            this.setState({
                emailError: false,
                email: email
            })
        } else {
            this.setState({
                emailError: true
            })
        }
    }
    handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        if (e.target.name === 'firstname') {
            if (e.target.value === '' || e.target.value === null) {
                this.setState({
                    firstnameError: true
                })
            } else {
                this.setState({
                    firstnameError: false,
                    firstName: e.target.value
                })
            }
        }
        if (e.target.name === 'lastname') {
            if (e.target.value === '' || e.target.value === null) {
                this.setState({
                    lastnameError: true
                })
            } else {
                this.setState({
                    lastnameError: false,
                    lastName: e.target.value
                })
            }
        }
        if (e.target.name === 'email') {
            this.validateEmail(e.target.value);
        }
        if (e.target.name === 'password') {
            if (e.target.value === '' || e.target.value === null) {
                this.setState({
                    passwordError: true
                })
            } else {
                this.setState({
                    passwordError: false,
                    password: e.target.value
                })
            }
        }
        if (this.state.firstnameError === false && this.state.lastnameError === false &&
            this.state.emailError === false && this.state.passwordError === false) {
            this.setState({
                isDisabled: false
            })
        }
    }
    submitForm(e) {
        e.preventDefault();
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }
        sendFormData(data).then(res => {
            if (res.status === 200) {
                alert(res.data);
                this.props.history.push('/');
            } else {

            }
        });
    }
    render() {
        return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Register here</div>
                    <div className="card-body">
                        <form id="signup-form">
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="text" id="firstname" name="firstname" className="form-control" placeholder="Enter firstname" onChange={(e) => { this.handleChange(e) }} />
                                    <label htmlFor="firstname">firstname</label>
                                    {this.state.firstnameError ? <span style={{ color: "red" }}>Please Enter some value</span> : ''}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="text" id="lastname" name="lastname" className="form-control" placeholder="Enter lastname" onChange={(e) => { this.handleChange(e) }} />
                                    <label htmlFor="lastname">lastname</label>
                                    {this.state.lastnameError ? <span style={{ color: "red" }}>Please Enter some value</span> : ''}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="email" id="email" name="email" className="form-control" placeholder="Enter your email" onChange={(e) => { this.handleChange(e) }} />
                                    <label htmlFor="email">email</label>
                                    {this.state.emailError ? <span style={{ color: "red" }}>Please Enter valid email address</span> : ''}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="password" id="password" name="password" className="form-control" placeholder="Password" onChange={(e) => { this.handleChange(e) }} />
                                    <label htmlFor="password">Password</label>
                                    {this.state.passwordError ? <span style={{ color: "red" }}>Please enter some   value</span> : ''}
                                </div>
                            </div>
                            <button className="btn btn-primary btn-block" disabled={this.state.isDisabled} onClick={this.submitForm}>Signup</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Signup;