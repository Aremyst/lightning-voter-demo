// Import "path" library
const path = require('path');
// Import "Webpack" itself
const webpack = require('webpack');
// Helpers library with 'root' function, which let's us go up one level in current directory.
const helpers = require('./helpers');
// HTML Webpack Plugin. This is one of the NPM packages.
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Bundle Analyzer Plugin. Used to generate HTML page(after the build), which shows bundles hierarchy and sizes.
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Set Environment to "development", so that we know know that it's Dev build.
const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

// Webpack configuration
module.exports = {
  // Entry point for Webpack
  entry: {
    // Bundle for polyfills only
    'polyfills': './public/polyfills.ts',
    // Angular2 and Vendor files
    'vendor': './public/vendor.ts',
    // Reference file, which contains all AngularJS files.
    // ./ because Webpack is executed from the root.
    'ng1': './public/index.ts',
    // Tell Webpack to build Angular2 application
    'app': './public/main.ts'
  },

  // Configure output
  output: {
    // Webpack will create "dist" folder at root with "dev" folder in it.
    // All bundles will go there.
    path: helpers.root('dist/dev'),
    // Since we're not using Webpack Dev Server, this setting is not very important
    publicPath: '/',
    // Name files according to the name of their bundle
    filename: '[name].bundle.js',
    chunkFilename: "[id].chunk.js"
  },

  // Define how Webpack will resolve file extensions
  resolve: {
    // First, look for .ts files, then if not found, look for .js file.
    // This way Webpack will try to use TypeScript files first and not compiled JS files.
    extensions: ['.ts', '.js']
  },

  // Set up Webpack loaders.
  module: {
    rules: [
      {
        // Regex for TypeScript files
        test: /\.ts$/,
        // 'awesome-typescript-loader' - translates TypeScript to JS
        // 'angular2-template-loader' - translates 'templateUrl' to require statement and also inlines the templates.
        //     This will work with both Angular1 or Angular2 files, since they both use templateUrl with a relative path.
        //     This is why we've used relative paths for all "templateUrl"-s.
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        // Regex for HTML files
        test: /\.html$/,
        // Just an HTML loader
        loader: 'html-loader'
      }
    ]
  },

  // Set plugins
  plugins: [
    // Create common plugin that just has all of the Webpack runtime in it.
    new webpack.optimize.CommonsChunkPlugin({
      // This will create file "common.bundle.js", that will have Webpack Runtime in it.
      name: 'common',
      minChunks: Infinity
    }),

    // We'll put common libraries here
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // Only pull from these 2 chunks:
      // All libraries, which are the common between these 2 bundles will end up in 'vendor' bundle.
      chunks: ['vendor', 'app'],
      // If library is used in at least two bundles, it will go here
      minChunks: 2
    }),

    // Plugin for Source Maps
    new webpack.SourceMapDevToolPlugin({
      // Standard settings.
      // This will make Webpack produce source maps for all of our files even though it's bundling all of them together.
      // We'll use source maps for debugging.
      "filename": "[file].map[query]",
      "moduleFilenameTemplate": "[resource-path]",
      "fallbackModuleFilenameTemplate": "[resource-path]?[hash]",
      "sourceRoot": "webpack:///"
    }),

    // This Plugin takes a template HTML file, and any bundles that it creates, it will add references to those
    // bundles to the template HTML file.
    // We'll be doing this with the index.html, so Webpack will be producing our index.html.
    // Webpack will write into index.thml all bundles it creates.
    new HtmlWebpackPlugin({
      // HTML Template, that we're going to use
      template: 'config/index.html',
      chunks: ['app']
    }),

    // Plugin, which helps Webpack to know about Environment.
    // This is pretty standard to do.
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),

    // This fixes Webpack build warning
    //     "core.es5.js Critical dependency: the request of a dependency is an expression..."
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'),
      {}
    ),

    // Create report about bundles sizes
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static'
    // })
  ]
};