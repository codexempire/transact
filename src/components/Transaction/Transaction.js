import React from 'react';
import PropTypes from 'prop-types';
import * as Toastr from 'toastr';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authAction } from '../../redux/actions';
import '../Login/login.css'

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
        this.style = {
            backgroundColor: 'rgb(105, 183, 247)'
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkForm = this.checkForm.bind(this);
    } 

    checkForm(e) {
        if(!(/\S+@\S+\.\S+/.test(this.state.email))) return true;
        if(this.state.password.length < 8) return true;
        return false;
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;

        const { authAction: loginAction } = this.props;
        const errors = {};
        if (!email) Toastr.error('Email cannot be empty');
        if (!password) Toastr.error('Password cannot be empty');
        if (Object.keys(errors).length) {
        this.setState(prevState => ({
            ...prevState,
            errors: {
            ...errors
            }
        }));
        return;
        }
        this.setState({ submittting: true });
        const { history } = this.props;
        console.log(this.props)
        loginAction({ userData: { type: 'signin', email, password }, history });
    }

    render() {
        return (
            <>
                <form onSubmit={this.onSubmit}>
                    <h1 className='text-center py-1'>Open an Account</h1>
                    <label htmlFor='name'>Fullname</label>
                    <input type='text' name='name' onChange={this.onChange} />
                    <label htmlFor='phonenumber'>PhoneNumber</label>
                    <input type='tel' name='phonenumber' onChange={this.onChange} />
                    <label htmlFor='password'>PIN</label>
                    <input type='password' name='password' onChange={this.onChange} />
                    <button className='btn' type='submit' disabled={ this.checkForm()} style={this.checkForm() ? this.style : null }>CREATE</button>
                </form>
                <p className='text-center'>Click <Link to='/dashboard'>HERE</Link> to register</p>
            </>
        )
    }
}

LoginForm.propTypes = {
    location: PropTypes.shape({
      from: PropTypes.string,
      url: PropTypes.string
    }).isRequired,
    authAction: PropTypes.func.isRequired
};
  
const mapStateToProps = state => ({
    error: state.authReducer.error,
    isAuthenticated: state.authReducer.isAuthenticated,
    status: state.authReducer.status
});
const mapDispatchToProps = {
   authAction
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
  