const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({ readOnly: true, static: './public'})
const isAuthorized = require('./isAuthorized')
const PORT = 3001
server.use(middlewares)
server.use(isAuthorized)
server.use(router)
server.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})