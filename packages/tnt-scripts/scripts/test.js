/* eslint-disable no-sync, no-process-exit */

process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'

process.on('unhandledRejection', err => {
  throw err
})

const fs = require('fs')
const paths = require('../config/paths')
const { runCLI } = require('jest-cli')

const argv = require('yargs')
  .option('verbose', {
    describe: 'Display individual test results with the test suite hierarchy.',
    default: true,
    type: 'boolean'
  })
  .option('sequential', {
    alias: 's',
    describe:
      'Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging.', //eslint-disable-line
    default: false,
    type: 'boolean'
  })
  .option('coverage', {
    alias: 'c',
    describe: 'Indicates that test coverage information should be collected and reported in the output.',
    default: false,
    type: 'boolean'
  })
  .option('integrationTests', {
    alias: 'it',
    describe: 'Indicates that test coverage information should be collected and reported in the output.',
    default: false,
    type: 'boolean'
  })
  .option('testNamePattern', {
    alias: 't',
    describe: 'Run only tests with a name that matches the regex.'
  })
  .help().argv

const baseJestConfig = {
  env: 'node',
  verbose: argv.verbose,
  coverage: argv.coverage,
  runInBand: argv.sequential,
  testNamePattern: argv.testNamePattern,
  coverageReporters: ['html', 'lcov', 'text'],
  preset: './node_modules/tnt-scripts/config/jest-preset.js',
  collectCoverageFrom: ['src/**/*.js', 'src/**/*.flow'],
  testPathIgnorePatterns: argv.integrationTests ? ['/node_modules/'] : ['/node_modules/', '__integration__']
}

const hasJestConfigFile = fs.existsSync(paths.appJestConfigFile)

let jestConfig = baseJestConfig
if (hasJestConfigFile) {
  const externalJestConfig = require(paths.appJestConfigFile)
  jestConfig = { ...jestConfig, ...externalJestConfig }
}

runCLI(jestConfig, [paths.appPath]).then(({ results }) => {
  const exitStatus = results.success ? 0 : 1
  process.exit(exitStatus)
})
