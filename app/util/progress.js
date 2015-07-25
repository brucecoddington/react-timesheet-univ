import axios from 'axios';
import {Promise} from 'es6-promise';
import NProgress from 'nprogress';

export default () => {

  axios.interceptors.request.use(
    (config) => {
      NProgress.start();
      return config;
    },
    (err) => {
      NProgress.done();
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      NProgress.done();
      return response;
    },
    (err) => {
      NProgress.done();
      return Promise.reject(err);
    }
  );
};
