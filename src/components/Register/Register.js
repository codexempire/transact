import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authAction } from '../../redux/actions';
import '../Login/login.css'

class RegistrationForm extends React.Component {
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
        const { history } = this.props;
        loginAction({ userData: { type: 'signup', email, password }, history });
    }

    render() {
        return (
            <>
                <form onSubmit={this.onSubmit}>
                    <h1 className='text-center py-1'>REGISTER</h1>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' onChange={this.onChange} />
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' onChange={this.onChange} />
                    <button className='btn' type='submit' disabled={ this.checkForm()} style={this.checkForm() ? this.style : null }>REGISTER</button>
                </form>
                <p className='text-center'>Click <Link to='/login'>HERE</Link> to signin</p>
            </>
        )
    }
}

RegistrationForm.propTypes = {
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
)(RegistrationForm);
  