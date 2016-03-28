var gulp 	= require('gulp'),
	sass = require('gulp-ruby-sass'),
	babel = require('gulp-babel'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload,
	concat = require('gulp-concat'),
	nodemon = require('gulp-nodemon'),
	debug = require('gulp-debug');


var config = {
	sassPath: 'public/assets/src/scss/style.scss',
	cssPath: 'public/assets/dist/css/style.css',
	normalize: 'node_modules/normalize.css/normalize.css',
	jsSrc: 'public/assets/src/js',
	jsDist: 'public/assets/dist/js'
}

gulp.task('sass', function() {
	return sass(config.sassPath)
		.pipe(gulp.dest(config.cssPath))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('scripts', function() {
	return gulp.src(config.jsSrc + '*.js')
		.pipe(debug({
			title: 'js-scripts'
		}))
		.pipe(concat('app.js'))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(config.jsDist));
})

gulp.task('nodemon', function(cb) {

	var called = false;
	nodemon({

			script: 'app.js',
			ignore: [
				'gulpfile.js',
				'node_modules/'
			]
		})
		.on('start', function() {

			if (!called) {

				called = true;
				cb();
			}
		})
		.on('restart', function() {

			setTimeout(function() {

				reload;
			}, 1000);
		});
});

// Serving functions
gulp.task('serve', ['sass', 'scripts', 'nodemon'], function() {
	browserSync.init({
		server: {
			baseDir: '/public/views/',

		},
		startPath: 'public/views/index.html',
		// proxy: "localhost:3000", // local node app address
		port: 5000, // use *different* port than above
		notify: true,
		ghostMode: {
			scroll: false
		}
	});
	gulp.watch(config.jsPath + '/**/*.js', ['scripts']);
	gulp.watch(['public/views/*.html', config.cssPath, config.jsDist], reload);
});

gulp.task('ghostMode');
gulp.task('default', ['serve']);
