# tnt-scripts

This package includes scripts and configuration used by [TNT](https://github.com/olx-global/TNT).<br>

## Commands

`package.json`
```
{
  "name": "app",
  "version": "1.0.0",
  "scripts": {
    "start": "tnt-scripts start"
  },
  "devDependencies": {
    "tnt-scripts": "olx-global/tnt-scripts#v1.0.0"
  }
}
```


### `tnt-scripts start`

Flow:

* Watch sources
* Build code on changes
* Restart app
