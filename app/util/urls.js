import props from '../properties';

export default {

  server () {
    if (!props.server.url) return '';
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
