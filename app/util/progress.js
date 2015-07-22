import axios from 'axios';
import {Promise} from 'es6-promise';
import NProgress from 'nprogress';

export default () => {

  axios.interceptors.request.use(
    function (config) {
      NProgress.start();
      return config;
    },
    function (err) {
      NProgress.done();
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      NProgress.done();
      return response;
    },
    function (err) {
      NProgress.done();
      return Promise.reject(err);
    }
  );
};