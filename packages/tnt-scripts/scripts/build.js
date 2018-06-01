/* eslint-disable no-console, no-process-exit, no-sync */

process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

process.on('unhandledRejection', err => {
  throw err
})

const argv = require('yargs')
  .option('sourcemap', {
    alias: 'S',
    describe: 'Add the sourcemaps to the bundle',
    default: false,
    type: 'boolean'
  })
  .help()
  .argv

const chalk = require('chalk')
const rollupConfigBuilder = require('../config/rollup')
const { rollup } = require('rollup')

process.on('SIGINT', process.exit)

const rollupConfig = rollupConfigBuilder(argv.sourcemap)

async function build() {
  const startTime = Date.now()
  console.log(chalk.green('[TNT] Bundling ...'))

  // create a bundle
  const bundle = await rollup(rollupConfig);

  // or write the bundle to disk
  await bundle.write(rollupConfig.output);

  const endTime = Date.now() - startTime
  console.log(chalk.green(`[TNT] Bundled in ${endTime}ms.`))
}

build()
