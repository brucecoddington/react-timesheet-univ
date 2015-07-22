import _ from 'lodash';
import Router from 'react-router';
import {Promise} from 'es6-promise';
import axios from 'axios';

import Store from '../flux/flux.store';

let state = {
  portfolio: {
    intro: 'Portfolio',
    filter: {
      buttons : [
        {filter: '*', label: 'Show All'},
        {filter: '.graphics', label: 'Graphics'},
        {filter: '.video', label: 'Video'},
        {filter: '.mix', label: 'Mix'}
      ]
    },
    gallery: {
      options: {"itemSelector":".gallery-inner", "masonry":{"columnWidth":".grid-sizer"}},
      items: [
        {
          type: 'graphics',
          url: 'single-project.html',
          thumbnail: '/assets/img/gallery/1.jpg',
          width: 800,
          height: 600,
          x: 0,
          y: 0,
          w: 4,
          h: 3,
          caption: {
            title: 'Big Experience',
            text: 'Graphics / Motion'
          }
        },{
          type: 'video',
          url: 'single-project-video.html',
          thumbnail: '/assets/img/gallery/2.jpg',
          width: 800,
          height: 600,
          x: 4,
          y: 0,
          w: 4,
          h: 3,
          caption: {
            title: 'Aletation',
            text: 'Video / Motion'
          }
        },{
          type: 'video',
          url: 'single-project-2.html',
          thumbnail: '/assets/img/gallery/3.jpg',
          width: 800,
          height: 1200,
          x: 8,
          y: 0,
          w: 4,
          h: 6,
          caption: {
            title: 'Foundation',
            text: 'Motion / Video'
          }
        },{
          type: 'mix',
          url: 'single-project-2.html',
          thumbnail: '/assets/img/gallery/4.jpg',
          width: 800,
          height: 600,
          x: 0,
          y: 3,
          w: 4,
          h: 3,
          caption: {
            title: 'Bootstrap',
            text: 'Graphics Mix'
          }
        },{
          type: 'mix',
          url: 'single-project-video.html',
          thumbnail: '/assets/img/gallery/5.jpg',
          width: 800,
          height: 1200,
          x: 4,
          y: 3,
          w: 4,
          h: 6,
          caption: {
            title: 'Videolicious',
            text: 'Video / Overlay'
          }
        },{
          type: 'video',
          url: 'single-project-video.html',
          thumbnail: '/assets/img/gallery/6.jpg',
          width: 800,
          height: 600,
          x: 8,
          y: 6,
          w: 4,
          h: 3,
          caption: {
            title: 'Mixilicious',
            text: 'Mixed Mix'
          }
        },{
          type: 'graphics',
          url: 'single-project.html',
          thumbnail: '/assets/img/gallery/7.jpg',
          width: 800,
          height: 600,
          x: 0,
          y: 6,
          w: 4,
          h: 3,
          caption: {
            title: 'Simple',
            text: 'Graphics / Design'
          }
        }
      ]
    }
  }
};

class PortfolioStoreFactory extends Store {

  constructor() {
    super();
    this.initState();
  }

  initState () {
    this.setState(state);
  }
}

export const PortfolioStore = new PortfolioStoreFactory();
