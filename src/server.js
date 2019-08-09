const express = require('express')
const bodyParser = require('body-parser')
const handler = require('./app.js').handler

const server = express()
server.use(bodyParser.json())

server.post('/', (req, res) => {
    const context = {
      fail: () => {
        res.sendStatus(500)
      },
      succeed: (data) => {
        res.send(data)
      },
    }

    handler(req.body, context, (err, response) => {
        if (err) {
          console.log("data", err)
          throw new Error(err)
        }
        if (response) {
          res.send(response)
        }
    })
})
  
server.listen(3000, () => {
  console.log('Listening...')
})