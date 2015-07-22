import _ from 'lodash';
import {Promise} from 'es6-promise';

import Store from '../flux/flux.store';

const animEndEventNames = {
  'WebkitAnimation' : 'webkitAnimationEnd',
  'OAnimation' : 'oAnimationEnd',
  'msAnimation' : 'MSAnimationEnd',
  'animation' : 'animationend'
};

let state = {
  support: {
    // animations : Modernizr.cssanimations
    animations: true
  },

  // animEndEventName: animEndEventNames[Modernizr.prefixed('animation')]
  animEndEventName: 'webkitAnimationEnd'
};

class PreloaderStoreFactory extends Store {

  constructor() {
    super();
    this.initState();
  }

  initState () {
    this.setState(state);
  }
}

export const PreloaderStore = new PreloaderStoreFactory();
