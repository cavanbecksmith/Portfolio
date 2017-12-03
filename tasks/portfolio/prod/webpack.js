import config from '../../config.js';
import gulp from 'gulp';
import util from 'gulp-util';

var webpackStream = require('webpack-stream');
var webpack = require('webpack');

var isProd = true;

const webpackConfig = {
	watch: false,
  // entry: './src/js/main.js',
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js'
		}
	},
	output: {
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{ test: /\.vue$/, loader: 'vue-loader' },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [ [
								'es2015',
								{
									'targets': {
										'browsers': [
											'last 2 versions',
											'ie >= 9'
										]
									},
									'loose': true,
									'modules': false
								}
							] ],
							plugins: [
								// for IE9
								// see https://gist.github.com/zertosh/4f818163e4d68d58c0fa
								// 'transform-proto-to-assign'
								// 'transform-object-assign'
							]
						}
					}
				]
			},
			{
				test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
				loader: 'url-loader?limit=8192&name=assets/[name].[ext]?[hash]'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin( {
			'process.env': { NODE_ENV: JSON.stringify( isProd ? 'production' : 'development' ) }
		} )
	],
}


gulp.task('webpack:prod', function() {
  return gulp.src(config.paths.src.webpack + 'webpack.js')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(config.paths.builds.prod.js))
 });


