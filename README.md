# ScriptDrop Webpack Config

An opinionated [webpack](https://webpack.js.org/) config for ScriptDrop JavaScript and TypeScript apps.

## Features

* [x] Source of truth for common packages
* [] Single and multiple HTML entry points
* [] Common chunks bundle when using multiple entry points
* [] ES6 transpilation via Babel
* [] Source Maps
* [] PostCSS
* [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
* [] HTML and JS minification (in production)
* [] Static gzip compression (in production)

## Basic Setup

```sh
$ npm install --save-dev @scriptdrop/webpack-config
```

**webpack.config.js**

```js
// If using parent and child configs then only use this line in your parent config
module.exports = require('@scriptdrop/webpack-config')
```

**Start development server**

```sh
# Add the following line in your package.json
$ webpack-dev-server --mode development --open 'Google Chrome'"
```