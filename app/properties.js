import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';

export default {

  appName: "timesheet-api",

  session : {
    secret : "d0853b30-3d95-11e2-a25f-0800200c9a66", // uuid hash
    expires : 3 * 24 * 60 * 60 * 1000,
    key : 'timesheet.sid'
  },

  security : {
    cookieSecret: 'timesheet-cookie-secret'
  },

  server : {
    url: 'http://localhost',
    port: (function () {
      if (ExecutionEnvironment.canUseDOM) {
        return window.PORT || 5000;
      }
      else {
        return ~~process.env.PORT || 5000;
      }
    }())
  }
};
