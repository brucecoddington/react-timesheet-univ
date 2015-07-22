import _ from 'lodash';
import Router from 'react-router';
import {Promise} from 'es6-promise';
import axios from 'axios';

import Store from '../flux/flux.store';

let state = {
  contact: {
    title: 'Contact',
    text: 'The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother\'s keeper and the finder of lost children.'
  },

  contactInfo: {
    title: 'Don\t hesitate to contact us.',
    summary: 'Look, just because I don\'t be givin\' no man a foot massage don\'t make it right for Marsellus to throw Antwone into a glass motherfuckin\' house',
    address: {
      street: '7907 N 152nd Ave',
      city: 'Bennington',
      state: 'NE',
      zip: '68007'
    },
    phone1: '402 502 2300',
    phone2: '402 332 7004',
    email1: 'bmg@bluemoonghetto.com',
    email2: 'info@bluemoonghetto.com',
    hours1: 'M-F: 8 AM - 3 PM',
    hours2: 'Sa: 8 AM - 12 PM',
    hours3: 'Su: Closed',
    social: [
      {url: '', icon: 'fa-facebook'},
      {url: '', icon: 'fa-twitter'},
      {url: '', icon: 'fa-google-plus'},
      {url: '', icon: 'fa-instagram'},
      {url: '', icon: 'fa-youtube'}
    ]
  }
};

class ContactStoreFactory extends Store {

  constructor() {
    super();
    this.initState();
  }

  initState () {
    this.setState(state);
  }
}

export const ContactStore = new ContactStoreFactory();
