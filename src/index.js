import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Toastr from 'toastr';
import store from './redux/store';
import './index.css';
import '../node_modules/toastr/build/toastr.css';
import App from './App';

Toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-top-center',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
  preventDuplicates: true
};

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
