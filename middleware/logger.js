const moment = require('moment')

// Simple middleware funciton
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get('host')}${
      req.originalUrl
    }:${moment().format()}: ${moment().format()}`
  )
  next()
}

module.exports = logger
