/* eslint-disable prefer-template */
const plugins = [
  require.resolve('babel-plugin-external-helpers'),
  require.resolve('babel-plugin-transform-flow-strip-types'),
  /*[
    require.resolve('babel-plugin-transform-runtime'),
    {
      helpers: true,
      polyfill: false,
      regenerator: false
    }
  ],*/
  // The following two plugins use Object.assign directly, instead of Babel's
  // extends helper. Note that this assumes `Object.assign` is available.
  // { ...todo, completed: true }
  [require.resolve('babel-plugin-transform-object-rest-spread'), { useBuiltIns: true }],
  // Adds syntax support for import()
  require.resolve('babel-plugin-syntax-dynamic-import'),
  // Adds transforms class properties
  require.resolve('babel-plugin-transform-class-properties')
]

// This is similar to how `env` works in Babel:
// https://babeljs.io/docs/usage/babelrc/#env-option
// We are not using `env` because it’s ignored in versions > babel-core@6.10.4:
// https://github.com/babel/babel/issues/4539
// https://github.com/facebookincubator/create-react-app/issues/720
// It’s also nice that we can enforce `NODE_ENV` being specified.
const env = process.env.BABEL_ENV || process.env.NODE_ENV
if (env !== 'development' && env !== 'test' && env !== 'production') {
  throw new Error(
    'Using `babel-preset-test` requires that you specify `NODE_ENV` or ' +
      '`BABEL_ENV` environment variables. Valid values are "development", ' +
      '"test", and "production". Instead, received: ' +
      JSON.stringify(env) +
      '.'
  )
}

if (env === 'test') {
  module.exports = {
    presets: [
      // ES features necessary for user's Node version
      [
        require('babel-preset-env').default,
        {
          targets: {
            node: 'current'
          }
        }
      ]
    ],
    plugins
  }
} else {
  module.exports = {
    presets: [
      // Latest stable ECMAScript features
      [
        require('babel-preset-env'),
        {
          targets: {
            node: '8.11'
          },
          // Disable polyfill transforms
          useBuiltIns: false,
          // Do not transform modules to CJS
          modules: false
        }
      ]
    ],
    plugins
  }
}
