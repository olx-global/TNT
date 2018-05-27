/* eslint-disable no-sync */
const path = require('path')
const fs = require('fs')

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath)

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appNodeModules: resolveApp('node_modules'),
  appSrc: resolveApp('src'),
  appPackageJson: resolveApp('package.json'),
  appIndexJs: resolveApp('src/index.js'),
  appBuildJs: resolveApp('app.js'),
  appBabelRc: resolveApp('.babelrc'),
  appEslintRc: resolveApp('.eslintrc'),
  ownPath: resolveOwn('.'),
  ownNodeModules: resolveOwn('node_modules')
}
