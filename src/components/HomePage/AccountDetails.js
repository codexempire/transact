import React from 'react';
import PropTypes from 'prop-types';
import * as Toastr from 'toastr';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authAction } from '../../redux/actions';
import '../Login/login.css'

const AccountDetails = () => {
    return (
        <div className='container lg-bd-r'>
            <table>
                <td>
                    <th>Name</th>
                    <th>A/Number</th>
                </td>
            </table>
        </div>
    )
}

export default AccountDetails;
