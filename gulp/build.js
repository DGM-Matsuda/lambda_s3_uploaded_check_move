/**
 * Created by koichi.matsuda on 2016/01/14.
 */
var gulp = require('gulp');
var typescript = require('gulp-typescript');

var path = require('path');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'uglify-save-license', 'del']
});

var config = {
    ts : {
        src: [
            conf.paths.src + '/**/*.ts',
            '!' + conf.paths.src + '/**/*.d.ts',
            '!./node_modules/**/*.ts'
        ],
        dst: conf.paths.dist,
        options: {
            target: 'ES5',
            module: 'commonjs'
        }
    }
};

gulp.task('build', function () {
    return gulp.src(config.ts.src)
        .pipe(typescript(config.ts.options))
        .js
        .pipe(gulp.dest(config.ts.dst));
});

gulp.task('clean', function () {
    return $.del([path.join(conf.paths.dist, '/'), path.join('./dist.zip')]);
});
