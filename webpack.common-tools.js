/* eslint eslint-comments/no-use: off */

// const fs = require('fs')
const path = require('path')

const { EnvironmentPlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProd = (env) => env.NODE_ENV === "production"

module.exports = {
  tools: {
    isProd
  },
  commonPlugins: {
    css: (env, { filename } = { filename = '../css/app.css' }) => new MiniCssExtractPlugin({ filename }),
    copyAssets: (env) => new CopyWebpackPlugin([{ from: 'static/', to: '../' }]),
  },
  commonModuleRules: {
    js: env => ({
      test: /\.(ts|js)x?$/, //pt-app, cmw-c, cmw-story
      exclude: [
        /node_modules/,//core, api-docs, pt-app, CN, jj, mckes, CA, phrm-ad, cmw-c
        './js/utils/test', //cmw-c
      ],
      use: {
        loader: 'babel-loader',//core, api-docs, CN, jj, mckes, CA, phrm-ad, cmw-c, cmw-story
        options: {
          presets: [
            '@babel/react',//core
            '@babel/preset-env',//core
          ],
          plugins: ['@babel/plugin-proposal-class-properties'] //core
        }
      },
    }),
    css: env => ({
      test: /\.css$/,//core, api-docs, CN, jj, mckes, CA, phrm-ad, cmw-c
      use: [
        {
          loader: MiniCssExtractPlugin.loader,//core, api-docs, pt-app, CN, jj, mckes, CA, phrm-ad, cmw-c
          options: {
            hmr: !isProd(env),//pt-app
          },
        },
        'css-loader',//core, api-docs, pt-app, CN, jj, mckes, CA, phrm-ad, cmw-c
        'postcss-loader', //pt-app
      ]//core, api-docs
    }),
    file_loader: env => ({
      test: /\.(eot|ttf|woff2?|otf|jpg|png|svg)(\?.*$|$)/,//core
      loader: 'url-loader?limit=1000000'
    })

  },
  config: (env = { NODE_ENV: 'development' }, options) => {
    // const opts = Object.assign({}, defaultOptions, options)
    const config = {}

    config.mode = isProd(env) ? "production" : "development"

    config.devtool = isProd(env) ? 'nosources-source-map' : 'eval-source-map'

    config.entry = {
      './js/app.js': ['./js/app.js'].concat(glob.sync('./vendor/**/*.js'))
    }

    config.output = {
      filename: 'app.js',
      path: path.resolve(__dirname, '../priv/static/js')
    }

    return config
  }
}

