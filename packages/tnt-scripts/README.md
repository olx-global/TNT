# tnt-scripts

This package includes scripts and configuration used by [TNT](https://github.com/olx-global/TNT).<br>

## Commands

`package.json`
```
{
  "name": "app",
  "version": "1.0.0",
  "scripts": {
    "build": "tnt-scripts build"
    "start": "tnt-scripts start"
  },
  "devDependencies": {
    "tnt-scripts": "olx-global/tnt-scripts#v1.0.0"
  }
}
```


### `tnt-scripts start`

This tasks start the application in development mode.

####Flow:

* Watch sources
* Build code on changes
* Restart app

### `tnt-scripts build`

This tasks bundles the application, by default the path is `${ROOT}/build/app.js`.
