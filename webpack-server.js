var path = require('path')
var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var morgan = require('morgan')
var config = process.env.NODE_ENV === 'production' ? require('./webpack.prod.config') : require('./webpack.dev.config')

var app = express()
var compiler = webpack(config)
var router = express.Router()

app.set('port', (process.env.PORT || 3000))

app.use(morgan('combined'))
app.use(express.static('/static'))
app.use(express.static('/data'))

if (process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
      history: true
  }))
  app.use(webpackHotMiddleware(compiler))
}

// app.use(function(req, res, next) {
//     if (req.get('content-type') === 'application/json') {
//       req.headers.accept = 'application/json'
//     }
//
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//     next()
// });

// app.get('*', function(req, res) {
//   res.format({
//     'text/html': function (){
//       res.sendFile(path.join(__dirname, 'project/templates/index.html'))
//     },
//     'application/json': function (){
//       res.sendFile(path.join(__dirname, 'project' + req.originalUrl))
//     },
//     'default': function () {
//       // log the request and respond with 406
//       res.status(406).send('Response format is not acceptable');
//     }
//   })
// })

if (process.env.NODE_ENV === 'production') {
  http.createServer(app).listen(app.get('port'), function (err) {
    if (err) {
      debug(err)
    }
    console.log(process.env.NODE_ENV, ' listening on port: ', app.get('port'))
  })
} else {
  app.listen(app.get('port'), '0.0.0.0', function (err) {
    if (err) {
      debug(err)
    }
    console.log(process.env.NODE_ENV, ' listening on port: ', app.get('port'))
  })
}
