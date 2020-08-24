
const path = require('path');

const argv = require("yargs-parser")(process.argv.slice(2));
const merge = require("webpack-merge");
const _mode = argv.mode || "development";
const _modeflag = (_mode == "production" ? true : false);

const _mergeConfig = require(`./config/webpack.${_mode}.js`);

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');


const TransformModulesPlugin = require('webpack-transform-modules-plugin')

const CompressionWebpackPlugin = require('compression-webpack-plugin')



const projectName = require('./project').name;
const baseSource = `./src/${projectName}`;

// console.log(1234567879)

// console.log(path.join(__dirname, `${baseSource}/index.js`)); // , _mergeConfig.opts.entry

// console.log(1234567879)

webpackConfig = {
  entry: path.join(__dirname, `${baseSource}/index.js`),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, baseSource),
      'cube-ui': 'cube-ui/lib',
      'vue$': 'vue/dist/vue.js',
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader', //?cacheDirectory=true
            options: {
              cacheDirectory: true
            }
          }
        ],
        include: [path.resolve(baseSource)],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: './',
              // hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader'
        ]
      }, {
        test: /\.less$/,
        use: [
         
          'vue-style-loader',
          'css-loader', // translates CSS into CommonJS
          'less-loader', // compiles Less to CSS
        ]
      }, {
        test: /\.(png|jpg|gif)$/i,
        loader: 'url-loader',
        options: {
          limit: 3000,
          name:  _modeflag ? '[name].[hash:5].[ext]' : '[name].[ext]'
        }
      },{
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      }, {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new ProgressBarPlugin(),
    
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: _modeflag ? 'styles/[name].[hash:5].css' : 'styles/[name].css',
      chunkFilename:  _modeflag ? 'styles/[name].[hash:5].css' : 'styles/[name].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new CompressionWebpackPlugin({
      test: /\.js$|\.html$|\.css$/,
      // 超过4kb压缩
      threshold: 4096,
      filename: 'scripts/[name].js.gz'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${baseSource}/index.html`,
    }),
    new CopyPlugin([
      { 
        from:  path.resolve(__dirname, `${baseSource}/static`), 
        to: path.resolve(__dirname, 'dist/static'),
        force: true,
        ignore: ['.*']
      }
    ]),
    new CleanWebpackPlugin({ template: './dist/index.html' }),
    new TransformModulesPlugin()
  ] 
}

module.exports = merge(_mergeConfig.config, webpackConfig)