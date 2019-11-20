import React from 'react';
import Details from './AccountDetails';
import AccountForm from '../Account/Account';

export default props => (
    <>
        <header className='block bg-blue'>TRANsact</header>
        <div className='container'>
            <div className='two-third'>
                <div className='container flex-around'>
                    <button type='button' className='sm-btn'>Account</button>
                    <button type='button' className='sm-btn active'>Transactions</button>
                    <button type='button' className='sm-btn'>Send</button>
                </div>
                <div className='bd-t'>

                </div>
                {
                    props.location.pathname === '/transaction' ? <Transaction /> : <Details />
                }
            </div>
            <div className='one-third'>
                <AccountForm />
            </div>
        </div>
    </>
);
