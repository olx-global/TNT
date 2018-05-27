# babel-preset-tnt

This package includes the Babel preset used by [TNT](https://github.com/naspersclassifieds-regional/the-node-tool).<br>
Please refer to its documentation:

* [Getting Started](https://github.com/https://github.com/naspersclassifieds-regional/the-node-tool/blob/master/README.md#getting-started) – How to create a new app.

## Usage in Projects

Install babel-preset-tnt.

```sh
npm install babel-preset-tnt --save-dev
```

Then create a file named `.babelrc` with following contents in the root folder of your project:

```js
{
  "presets": ["tnt"]
}
```

This preset uses the `useBuiltIns` option with [transform-object-rest-spread](http://babeljs.io/docs/plugins/transform-object-rest-spread/) and [transform-react-jsx](http://babeljs.io/docs/plugins/transform-react-jsx/), which assumes that `Object.assign` is available or polyfilled.
