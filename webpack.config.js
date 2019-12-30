/* eslint eslint-comments/no-use: off */

const fs = require('fs')
const path = require('path')

const {EnvironmentPlugin} = require('webpack')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = (env = 'development', options) => {
  // const opts = Object.assign({}, defaultOptions, options)

  const config = {}

  config.mode = env

  return config
}

