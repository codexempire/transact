import React from 'react';
import PropTypes from 'prop-types';
import * as Toastr from 'toastr';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createAccount } from '../../redux/actions';
import '../Login/login.css'

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            fullName: '',
            pin: '',
            phoneNumber: '',
        }
        this.style = {
            backgroundColor: 'rgb(105, 183, 247)'
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkForm = this.checkForm.bind(this);
    } 

    checkForm(e) {
        if(this.state.fullName > 8) return false;
        if(this.state.phoneNumber.length === 11) return false;
        if(this.state.length === 4) return false
        return true;
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;

        const { createAccount: openAccount } = this.props;
        openAccount({ ...this.state });
    }

    render() {
        console.log(this.state)
        return (
            <>
                <form onSubmit={this.onSubmit} className='form'>
                    <h2 className='text-center py-1'>Open an Account</h2>
                    <label htmlFor='fullName'>Fullname</label>
                    <input type='text' name='fullName' onChange={this.onChange} />
                    <label htmlFor='phoneNumber'>PhoneNumber</label>
                    <input type='tel' name='phoneNumber' onChange={this.onChange} />
                    <label htmlFor='pin'>PIN</label>
                    <input type='password' name='pin' onChange={this.onChange} />
                    <button className='btn' type='submit' disabled={ this.checkForm()} style={this.checkForm() ? this.style : null }>CREATE</button>
                </form>
            </>
        )
    }
}

LoginForm.propTypes = {
    createAccount: PropTypes.func.isRequired
};
  
const mapStateToProps = state => ({
    error: state.authReducer.error,
    isAuthenticated: state.authReducer.isAuthenticated,
    status: state.authReducer.status
});
const mapDispatchToProps = {
   createAccount
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
  