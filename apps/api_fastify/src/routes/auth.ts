const login = (request: any, reply: any) => {
  reply.send({hello: 'world'});
}
export default (server: any, opt: any, done: any) => {
  server.get("/api/v1/auth/login", login)
  done();
}