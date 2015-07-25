import props from '../properties';

export default {

  server () {
    return `${props.server.url}:${props.server.port}`;
  },

  apiResource (resourceName, resourceId) {
    let url = `${this.server()}/api/${resourceName}`;
    if (resourceId) {
      url += `/${resourceId}`;
    }

    return url;
  }
};
