const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)



// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.post('/products/', (req, res, next) => {
  let date = new Date()
  req.body.createdAt = date.toISOString()
  
  if(req.body.price) {
    req.body.price = Number(req.body.price)
  }

  
  next()
})

// Use default router
server.use(router)
server.listen(3004, () => {
  console.log('JSON Server is running')
})