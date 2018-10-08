/* eslint-disable no-param-reassign */

module.exports = (api, opts, env) => {
  if (!opts) {
    opts = {}
  }

  const isEnvDevelopment = env === 'development'
  const isEnvProduction = env === 'production'
  const isEnvTest = env === 'test'

  if (!isEnvDevelopment && !isEnvProduction && !isEnvTest) {
    throw new Error(
      `Using 'babel-preset-tnt' requires that you specify 'NODE_ENV' or 'BABEL_ENV' environment variables. \
      Valid values are "development", "test", and "production". Instead, received: ${JSON.stringify(env)}.`
    )
  }

  return {
    presets: [
      isEnvTest && [
        // ES features necessary for user's Node version
        require('@babel/preset-env').default,
        {
          targets: {
            node: 'current'
          }
        }
      ],
      (isEnvProduction || isEnvDevelopment) && [
        // Latest stable ECMAScript features
        require('@babel/preset-env').default,
        {
          targets: {
            node: 'current'
          },
          // Users cannot override this behavior because this Babel
          // configuration is highly tuned for ES5 support
          ignoreBrowserslistConfig: true,
          // If users import all core-js they're probably not concerned with
          // bundle size. We shouldn't rely on magic to try and shrink it.
          useBuiltIns: false,
          // Do not transform modules to CJS
          modules: false,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol']
        }
      ]
    ].filter(Boolean),
    plugins: [
      // Strip flow types before any other transform, emulating the behavior
      // order as-if the browser supported all of the succeeding features
      // https://github.com/facebook/create-react-app/pull/5182
      require('@babel/plugin-transform-flow-strip-types').default,
      // Experimental macros support. Will be documented after it's had some time
      // in the wild.
      require('babel-plugin-macros'),
      // Necessary to include regardless of the environment because
      // in practice some other transforms (such as object-rest-spread)
      // don't work without it: https://github.com/babel/babel/issues/7215
      require('@babel/plugin-transform-destructuring').default,
      // class { handleClick = () => { } }
      // Enable loose mode to use assignment instead of defineProperty
      // See discussion in https://github.com/facebook/create-react-app/issues/4263
      [
        require('@babel/plugin-proposal-class-properties').default,
        {
          loose: true
        }
      ],
      // The following two plugins use Object.assign directly, instead of Babel's
      // extends helper. Note that this assumes `Object.assign` is available.
      // { ...todo, completed: true }
      [
        require('@babel/plugin-proposal-object-rest-spread').default,
        {
          useBuiltIns: true
        }
      ],
      // Adds syntax support for import()
      require('@babel/plugin-syntax-dynamic-import').default,
      // Adds syntax support for @decorator
      [
        require('@babel/plugin-proposal-decorators').default,
        {
          legacy: true
        }
      ],
      // Adds syntax support for a?.b
      require('@babel/plugin-proposal-optional-chaining').default,
      require('@babel/plugin-proposal-export-namespace-from').default,
      isEnvTest &&
        // Transform dynamic import to require
        require('babel-plugin-transform-dynamic-import').default
    ].filter(Boolean)
  }
}
