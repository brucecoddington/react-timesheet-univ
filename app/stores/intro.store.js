import _ from 'lodash';
import Router from 'react-router';
import {Promise} from 'es6-promise';
import axios from 'axios';

import Store from '../flux/flux.store';

let state = {
  intro: {
    title: 'omaha, ne',
    text: 'Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it?'
  }
};

class IntroStoreFactory extends Store {

  constructor() {
    super();
    this.initState();
  }

  initState () {
    this.setState(state);
  }
}

export const IntroStore = new IntroStoreFactory();
