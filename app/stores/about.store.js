import _ from 'lodash';
import Router from 'react-router';
import {Promise} from 'es6-promise';
import axios from 'axios';

import Store from '../flux/flux.store';

let state = {
  proxyId: 'about-proxy',
  intro: {
    title: 'About Us',
    text: 'Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun in American crime. Like they\'re actually proud of that shit.'
  },

  items: [
    {
      ratio: '1.05',
      icon: 'fa-puzzle-piece',
      title: 'Flexible',
      text: 'The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men.'
    },
    {
      ratio: '1.05',
      icon: 'fa-eye',
      title: 'Retina Ready',
      text: 'And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.'
    },
    {
      ratio: '1.05',
      icon: 'fa-code',
      title: 'Clean Code',
      text: 'Normally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I\'m in a transitional period so I don\'t wanna kill you, I wanna help you.'
    },
    {
      ratio: '1.05',
      icon: 'fa-magic',
      title: 'Trending Design',
      text: 'But I can\'t give you this case, it don\'t belong to me. Besides, I\'ve already been through too much shit this morning over this case to hand it over to your dumb ass.'
    }
  ],

  progress: {
    title: 'Retina Ready',
    text: 'The animals can\'t manufacture the amino acid lysine. Unless they\'re continually supplied with lysine by us, they\'ll slip into a coma and die.',
    bars: [
      {
        title: 'Wordpress',
        progress: '60'
      },
      {
        title: 'Javascript',
        progress: '80'
      },
      {
        title: 'CSS',
        progress: '60'
      },
      {
        title: 'Dedication',
        progress: '100'
      }
    ]
  }
};

class AboutStoreFactory extends Store {

  constructor() {
    super();
    this.initState();
  }

  initState () {
    this.setState(state);
  }
}

export const AboutStore = new AboutStoreFactory();
