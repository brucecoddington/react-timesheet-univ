import {Promise} from 'es6-promise';
import _ from 'lodash';

export default (routerState) => {

  let { params, query, components } = routerState;

  console.log('routerState : ' + JSON.stringify(routerState));
  console.log('params : ' + JSON.stringify(params));
  console.log('query : ' + JSON.stringify(query));

  let fetchers = components.filter((component) => {
    console.log('fetch : ' + typeof component.fetch);
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
