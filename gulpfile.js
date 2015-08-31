'use strict';

var gulp = require('gulp');

// utilities
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');

// styles
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// scripts
var react = require('gulp-react');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

// server & watch
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

//Error handling that will return an error, but not break the watch task
var onError = function(err) {
    gutil.beep();
    console.error(err.message);
    this.emit('end');
}

//Define paths
var paths = {
	dest: 'compiled/',
	assets: 'assets/**/*.*',
	assetsDest: 'compiled/assets/',
	js: ['scripts/*.jsx', 'scripts/*.js', 'scripts/**/*.js', 'scripts/**/*.jsx'],
	jsDest: 'compiled/*.js',
	lib: 'lib/*.js',
	scss: 'styles/main.scss',
	scssWatch: ['styles/**/*.scss'],
	html: 'views/*.html'
}

gulp.task('scripts', ['lint'], function(){
	return gulp.src(paths.js)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(gulpif(argv.prod, sourcemaps.init()))
		.pipe(react())
		.pipe(concat('main.min.js'))
		.pipe(gulpif(argv.prod, uglify()))
		.pipe(gulpif(argv.prod, sourcemaps.write('./map')))
		.pipe(gulp.dest(paths.dest))
		.pipe(plumber.stop());
});

gulp.task('lib', function(){
	return gulp.src(paths.lib)
		// .pipe(sourcemaps.init())
		.pipe(concat('lib.min.js'))
		.pipe(gulpif(argv.prod, uglify()))
		// .pipe(sourcemaps.write('./map'))
		.pipe(gulp.dest(paths.dest));
});

gulp.task('lint', function(){
    return gulp.src(paths.js)
        .pipe(jshint({ esnext: true, linter: require('jshint-jsx').JSXHINT}))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('styles', function(){
	return gulp.src(paths.scss)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(gulpif(argv.prod, sourcemaps.init()))
		.pipe(sass())
		.pipe(gulpif(argv.prod, cssmin()))
		.pipe(gulpif(argv.prod, autoprefixer({
			browsers: ['last 2 versions']
		})))
		.pipe(gulpif(argv.prod, sourcemaps.write('./map')))
		.pipe(gulp.dest(paths.dest))
		.pipe(plumber.stop())
		.pipe(reload({stream: true}))
});

gulp.task('build', ['scripts', 'styles', 'lib'], function(){
	return gulp.src(paths.assets)
		.pipe(gulp.dest(paths.assetsDest));
});

gulp.task('default', ['watch'], function(){

});

gulp.task('watch', ['serve'], function(){
	gulp.watch(paths.js, ['scripts']);
	gulp.watch([paths.scssWatch], ['styles'])
	gulp.watch('views/*.jade').on('change', browserSync.reload);
	gulp.watch(paths.jsDest).on('change', browserSync.reload)
})

gulp.task('serve', ['nodemon'], function(){
	browserSync.init({
		proxy: 'http://localhost:8080',
		port: 8000,
		browser: ['google chrome canary']
	})
});

gulp.task('nodemon', ['build'], function(cb){
	var called = false;
	return nodemon({
		script: 'server.js',
		watch: ['server.js', 'app/**/*.js']
	})
	.on('start', function onStart(){
		if (!called) { cb();}
		called = true;
	})
	.on('restart', function onRestart(){
		setTimeout(function reload(){
			browserSync.reload({
				stream: false
			});
		}, 500);
	})
});