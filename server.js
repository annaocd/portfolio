var express = require('express')
var path = require('path')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.dev.config')

var app = express()
var compiler = webpack(config)
var isDevelopment = process.env.NODE_ENV !== 'production'
var DIST_DIR = path.join(__dirname, 'project/public')
var HTML_FILE = path.join(__dirname, 'project/templates/index.html')
var DEFAULT_PORT = 3000

app.set('port', process.env.PORT || DEFAULT_PORT)

if (isDevelopment) {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    history: true
  }))
  app.use(webpackHotMiddleware(compiler))
  app.get('*', function(req, res) {
    res.format({
      'text/html': function (){
        res.sendFile(HTML_FILE)
      },
      'application/json': function (){
        res.sendFile(path.join(__dirname, 'project' + req.originalUrl))
      },
      'default': function () {
        res.status(406).send('Response format is not acceptable');
      }
    })
  })
} else {
  app.use(express.static(DIST_DIR))
  app.get('*', function (req, res) {
    return res.sendFile(HTML_FILE)
  })
}

app.listen(app.get('port'))
