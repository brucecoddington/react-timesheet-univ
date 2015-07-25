import {Promise} from 'es6-promise';
import _ from 'lodash';

export default (routerState) => {

  let { params, query } = routerState;

  let fetchers = routerState.routes.filter((route) => {
    return route.handler.fetch;
  })
  .map((route) => {
    return route.handler.fetch(params, query);
  });

  return Promise.all(fetchers)
    .then((dataArray) => {
      return _.reduce(dataArray, (state, value) => {
        return _.merge(state, value);
      });
    });
}