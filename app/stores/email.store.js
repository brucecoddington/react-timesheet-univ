import _ from 'lodash';
import Router from 'react-router';
import {Promise} from 'es6-promise';
import axios from 'axios';

import Store from '../flux/flux.store';

let state = {
  message: {},
  result: '',
  hideResult: true,
  submitDisabled: false
};

class EmailStoreFactory extends Store {

  constructor() {
    super();
    this.initState();
  }

  initState () {
    this.setState(state);
  }
}

export const EmailStore = new EmailStoreFactory();
