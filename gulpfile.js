'use strict';

var gulp  = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
     gulp = require('gulp'),
     download_url = require('./download_url') ;


    // Lint
    gulp.task('lint', function () {
    return gulp.src(['**/*.js', '!./node_modules/**'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
    });
    // Default
    gulp.task('default', ['test','lint'], function () {
    gulp.watch(['**/*.js', '!./node_modules/**'], ['test','lint']);
    });
// Test
    gulp.task('test', function () {
    download_url();

  });
