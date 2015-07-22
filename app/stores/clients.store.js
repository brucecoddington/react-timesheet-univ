import _ from 'lodash';
import Router from 'react-router';
import {Promise} from 'es6-promise';
import axios from 'axios';

import Store from '../flux/flux.store';

class ClientsStoreFactory extends Store {

  constructor() {
    super();
    this.initState();
  }

  initState () {
    this.setState({
      clients: [
        {dest: '#', src: '/assets/img/clients/1.png'},
        {dest: '#', src: '/assets/img/clients/2.png'},
        {dest: '#', src: '/assets/img/clients/3.png'},
        {dest: '#', src: '/assets/img/clients/4.png'},
        {dest: '#', src: '/assets/img/clients/5.png'},
        {dest: '#', src: '/assets/img/clients/6.png'},
        {dest: '#', src: '/assets/img/clients/7.png'}
      ]
    });
  }
}

export const ClientsStore = new ClientsStoreFactory();
