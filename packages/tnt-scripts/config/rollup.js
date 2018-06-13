/* eslint-disable no-sync, no-undefined */

const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const fs = require('fs')
const resolve = require('rollup-plugin-node-resolve')
const paths = require('./paths')

module.exports = (sourcemap = true) => {
  const hasBabelRc = fs.existsSync(paths.appBabelRc);

  let babelPresets = ['tnt']
  let babelPlugins = []
  let babelEnv = {}
  if (hasBabelRc) {
    const babelRc = require.resolve(paths.appBabelRc)
    babelPresets = babelRc.presets || babelPresets
    babelPlugins = babelRc.plugins || babelPlugins
    babelEnv = babelRc.env || babelEnv
  }

  return {
    input: paths.appIndexJs,
    output: {
      file: paths.appBuildJs,
      format: 'cjs',
      sourcemap: sourcemap ? 'inline' : undefined
    },
    plugins: [
      babel({
        exclude: 'node_modules/**', // only transpile our source code
        presets: babelPresets,
        plugins: babelPlugins,
        env: babelEnv,
        externalHelpers: true,
        runtimeHelpers: true
      }),
      resolve({ modulesOnly: true }),
      commonjs()
    ],
    // Temporal fix to https://github.com/rollup/rollup-plugin-node-resolve/issues/77
    external: id => (/^\w[\w-/]+$/).test(id)
  }
}
