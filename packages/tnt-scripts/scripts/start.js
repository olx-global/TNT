/* eslint-disable no-console, no-process-exit, no-sync */

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

process.on('unhandledRejection', err => {
  throw err
})

const chalk = require('chalk')
const paths = require('../config/paths')
const Process = require('../utils/Process')
const rollupConfigBuilder = require('../config/rollup')
const { watch } = require('rollup')
const clearConsole = require('../utils/clearConsole')

process.on('SIGINT', process.exit)

const rollupConfig = rollupConfigBuilder()

const watcher = watch(rollupConfig)

function handleError(err) {
  console.error(err.stack)
  process.exitCode = 1
}

let started

const appProcess = new Process({ entryPoint: paths.appBuildJs })

watcher.on('event', event => {
  switch (event.code) {
    case 'START':
      break

    case 'END':
      break

    case 'BUNDLE_START':
      clearConsole()
      console.log(chalk.green('[TNT] Bundling ...'))
      break

    case 'BUNDLE_END':
      console.log(chalk.green(`[TNT] Bundled in ${event.duration}ms. Watching for changes`))
      if (!started) {
        started = true
        console.log(chalk.green('[TNT] Staring app ...'))
        appProcess.start()
      } else {
        appProcess.restart()
      }
      break

    case 'ERROR':
      handleError(event.error)
      break

    default:
      console.error('[TNT] Unknown event', event)
  }
})
