/*global module, require, console*/
/*jslint nomen: false*/
// module.exports = {
//
//   appName: "timesheet-api",
//
//   session : {
//     secret : "d0853b30-3d95-11e2-a25f-0800200c9a66", // uuid hash
//     expires : 3 * 24 * 60 * 60 * 1000,
//     key : 'timesheet.sid'
//   },
//
//   security : {
//     cookieSecret: 'timesheet-cookie-secret'
//   },
//
//   server : {
//     port: 3000
//   }
// };





export default {

  appName: "kav-isomorph",

  session : {
    secret : "d0853b30-3d95-11e2-a25f-0800200c9a66", // uuid hash
    expires : 3 * 24 * 60 * 60 * 1000,
    key : 'kav.sid'
  },

  security : {
    cookieSecret: 'kav-cookie-secret'
  },

  server : {
    port: 3000
  },

  // regex to determine if a mobile browser is being used
  mobileRegex: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,

  // scroller configuration
  scroller: {
    speed: 1000,
    defaultActive: 'home'
  },

  background: {
    imageUrl: '/assets/img/kav/DeathtoStock_Simplify8.jpg'
  },

  preloader: {
    imageUrl: '/assets/img/kav/KavContracting4.1.png'
  },

  intro: {
    imageUrl: '/assets/img/kav/KavContracting3-white.png'
  },

  welcome: {
    imageUrl: '/assets/img/kav/Welcome.png' // 2800 x 1321
  },

  separator: {
    imageUrl: '/assets/img/kav/KavContracting4.2.png'
  },

  services: {
    imageUrl: '/assets/img/kav/services.png' // 1000 x 300
  },

  portfolio: {
    intro: {
      imageUrl: '/assets/img/kav/DeathtoStockSimplify6.jpg' // 2800 x 840
    }
  },

  footer: {
    imageUrl: '/assets/img/kav/KavContracting4.1-white.png'
  },

  social: {
    facebookUrl: '#',
    twitterUrl: '#',
    instagramUrl: '#',
    youtubeUrl: '#'
  }
};
