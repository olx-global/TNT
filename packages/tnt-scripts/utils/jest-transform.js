process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'

const babelJest = require('babel-jest')

module.exports = babelJest.createTransformer({
  presets: [
    'tnt'
  ],
  plugins: [
    'external-helpers'
  ]
})
