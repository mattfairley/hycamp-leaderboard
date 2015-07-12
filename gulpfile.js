'use strict';

var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	nodemon = require('gulp-nodemon')

var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('default', ['serve'], function(){

});

gulp.task('serve', ['nodemon'], function(){
	browserSync.init({
		files: ['src/**/*.*'],
		proxy: 'http://localhost:8080',
		port: 8000,
		browser: ['google chrome canary']
	})
});

gulp.task('nodemon', function(cb){
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
		}, BROWSER_SYNC_RELOAD_DELAY);
	})
});