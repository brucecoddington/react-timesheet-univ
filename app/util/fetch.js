import {Promise} from 'es6-promise';
import _ from 'lodash';

export default (routerState) => {
  if (!routerState) return {};

  let { params, query, components } = routerState;

  let fetchers = components.filter((component) => {
    return component.fetch;
  })
  .map((component) => {
    return component.fetch(params, query);
  });

  return Promise.all(fetchers)
    .then((dataArray) => {
      return _.reduce(dataArray, (state, value) => {
        return _.merge(state, value);
      });
    });
}
