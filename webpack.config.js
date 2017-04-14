const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const EnvironmentPlugin = webpack.EnvironmentPlugin

const NODE_ENV = getEnvVar('NODE_ENV', 'development')
const ENV_IS_PRODUCTION = NODE_ENV === 'production'
const DEBUG = !ENV_IS_PRODUCTION

const PATHS = {
  public: path.join(__dirname, '/project/public'),
  source: path.join(__dirname, '/project/source')
}

const COPY_PATHS = [{
  from: 'assets/**/*'
}]

const AUTOPREFIXER_CONFIG = {
  remove: false,
  browsers: ['> 1%', 'last 2 versions']
}

const WEBPACK_ENV = {
  NODE_ENV: JSON.stringify(NODE_ENV),
  DEBUG: JSON.stringify(DEBUG)
}

const WEBPACK_ENTRY = ENV_IS_PRODUCTION ? [
    'babel-polyfill',
    './js/init'
] : [
    'babel-polyfill',
    'eventsource-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './js/init'
]


module.exports = {
  context: PATHS.source,
  debug: DEBUG,
  devtool: null,
  target: 'web',

  entry: {
    main: WEBPACK_ENTRY
  },

  output: {
    path: PATHS.public,
    filename: 'js/[name].js'
  },

  module: {
    loaders: createWebpackLoaders()
  },

  plugins: createWebpackPlugins(),

  postcss () {
    return [
      autoprefixer(AUTOPREFIXER_CONFIG)
    ]
  }
}

// ..................................................

function getEnvVar (key, defaultValue) {
  const value = process.env[key]
  return value != null ? value : defaultValue
}

function createWebpackLoaders () {
  const loaders = [{
    test: /\.svg$/,
    loader: 'svg-sprite'
  }, {
    test: /\.(otf|ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
    loader: 'file'
  }, {
    test: /\.(ogg|mp?4a|mp3)$/,
    loader: 'file'
  }, {
    test: /\.(jpg|png)$/,
    loader: 'file?name=[path][name].[ext]',
    include: path.join(PATHS.source, 'assets')
  }, {
    test: /\.json$/,
    loader: 'json',
    include: path.join(PATHS.source, 'data')
  }, {
    test: /\.(pdf|txt)$/,
    loader: 'file',
    include: path.join(PATHS.source, 'docs')
  }]

  return loaders
}


function createWebpackPlugins () {
  const plugins = [
    new EnvironmentPlugin(['NODE_ENV']),
    new CopyWebpackPlugin(COPY_PATHS)
  ]

  return plugins
}
