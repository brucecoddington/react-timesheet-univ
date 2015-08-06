import {Promise} from 'es6-promise';
import _ from 'lodash';

export default (routerState, currentUser, request) => {
  if (!routerState) return {};

  let { params, query, components } = routerState;

  // retrieve all of the fetchers from the components' static blocks
  let fetchers = components.filter((component) => {
    return component.fetch;
  })
  // execute the fetchers and put the promises in an array
  .map(component => {
    return component.fetch(params, query, request);
  });

  // wait for all of the promises to resolve
  return Promise.all(fetchers)
    .then(dataArray => {
      // adding the logged in user information
      dataArray.push(currentUser);

      // combine all of the responses into a single object
      return _.reduce(_.flatten(dataArray), _.assign, {});
    });
}
