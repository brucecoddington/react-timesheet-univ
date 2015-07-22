export default {
  logout (request, reply) {
    request.auth.session.clear();
    return reply();
  }
};
