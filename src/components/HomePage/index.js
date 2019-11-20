import React from 'react';
import LoginForm from '../Login/LoginForm';
import ResitrationForm from '../Register/Register';

export default props => (
    <>
        <div className='container'>
            <div className='background_image half sm-hidden'></div>
            <div className='half'>
                {
                    props.location.pathname === '/signup' ? <ResitrationForm history={props.history} location={props.location} /> : <LoginForm history={props.history} location={props.location} />
                }
            </div>
        </div>
    </>
);
