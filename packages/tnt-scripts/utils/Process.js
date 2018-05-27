/* eslint-disable no-console*/

const chalk = require('chalk')
const spawn = require('cross-spawn')

class Process {
  constructor(options = {}) {
    this.options = { ...options }
    this.worker = null

    this.restart = this.restart.bind(this)
    this.start = this.start.bind(this)

    if (this.options.restartable !== false) {
      this._enableRestarting()
    }

    process.on('exit', () => {
      if (this.worker) {
        this.worker.kill()
      }
    })
  }

  _enableRestarting() {
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', data => {
      if (data.trim() === 'rs') {
        console.log(chalk.green('[TNT] Restaring app ...'))
        process.kill(this.worker.pid)
        this.worker = null
        this.start()
      }
    })
  }

  _getArgs() {
    const { options } = this
    const execArgv = (options.nodeArgs || []).concat(process.execArgv)
    if (options.args) {
      execArgv.push('--')
      Reflect.apply(execArgv.push, [execArgv, options.args])
    }
    return execArgv
  }

  restart() {
    if (this.worker) {
      console.log(chalk.green('[TNT] Restaring app ...'))
      this.worker.kill('SIGKILL')
      this.worker = null
      this.start()
    }
  }

  start() {
    if (!this.worker) {
      const execArgv = this._getArgs()

      this.worker = spawn(
        process.argv[0],
        execArgv.concat(this.options.entryPoint),
        { stdio: 'inherit', env: process.env }
      )

      this.worker.on('close', code => {
        if (typeof code === 'number' && code !== 0) {
          console.log(chalk.red(`[TNT] Application exited with code ${code}`))
        }
      })
    }
  }
}

module.exports = Process
