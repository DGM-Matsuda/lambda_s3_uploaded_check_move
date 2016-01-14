/**
 * Created by koichi.matsuda on 2016/01/14.
 */

var gulp = require('gulp');
var conf = require('./conf');
var tslint = require('gulp-tslint');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

gulp.task("tslint", function() {
    gulp.src([
            conf.paths.src + "/**/*.ts", "!" + conf.paths.src + "/**/*.d.ts"
        ])
        .pipe(plumber({errorHandler: notify.onError('Error: TSLint!!')}))
        .pipe(tslint({
            configuration: "tslint.json"
        }))
        .pipe(tslint.report("verbose"));
});