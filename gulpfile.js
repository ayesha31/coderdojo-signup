'use strict';

var gulp = require('gulp');
var config = require('./gulp.config.js');

var $ = require('gulp-load-plugins')({lazy: true});
var del = require('del');
var browserify = require('browserify');
var path = require('path');
var _ = require('lodash');
var source = require('vinyl-source-stream');
var series = require('stream-series');
var client = require('tiny-lr')();
var express = require('express');
var runSequence = require('run-sequence');
var fs = require('fs');

if (fs.existsSync('.env')) {
    require('dotenv').load();
}
var envConfig = require('./server/app.js').config;


gulp.task('clean', function (cb) {
    del([config.dest, 'dev', 'dist', 'temp'], {force: true}, cb);
});

gulp.task('lint', function () {
    var lintConfig = {
        rules: {
            'eqeqeq': [2, 'smart'],
            'quotes': [2, 'single'],
            'curly': [2, 'all'],
            'no-use-before-define': [2, 'nofunc']
        }
    };

    return gulp.src(config.js)
        .pipe($.eslint(lintConfig))
        .pipe($.eslint.formatEach())
        .pipe($.eslint.failOnError())
        .pipe($.livereload(client))
});

gulp.task('ng-config', function() {
    var dir = './temp';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, '0744');
    }

    fs.writeFileSync('temp/config.json',
        JSON.stringify(envConfig));

    gulp.src('temp/config.json')
        .pipe($.ngConfig(config.appName + '.config', {
            wrap: true
        })
    ).pipe(gulp.dest('temp'));
});

gulp.task('scripts', ['lint'], function () {
    return gulp.src(config.js.concat('temp/config.js'))
        // concat
        .pipe($.concat(config.appName + '.js'))
        .on('end', function () {
            $.util.log($.util.colors.cyan('concat complete'))
        })
        // annotate
        .pipe($.ngAnnotate({add: true}))
        .on('end', function () {
            $.util.log($.util.colors.magenta('ngAnnotate complete'))
        })
        .pipe(gulp.dest(config.dest))
        .pipe($.livereload(client));
});

gulp.task('dist:scripts', ['lint'], function () {
    return gulp.src(config.js.concat('temp/config.js'))
        .pipe($.sourcemaps.init())
        // concat
        .pipe($.concat(config.appName + '.js'))
        .on('end', function () {
            $.util.log($.util.colors.cyan('concat complete'))
        })
        // annotate
        .pipe($.ngAnnotate({add: true}))
        .on('end', function () {
            $.util.log($.util.colors.magenta('ngAnnotate complete'))
        })
        // uglify
        .pipe($.uglify({mangle: true}))
        .on('end', function () {
            $.util.log($.util.colors.cyan('uglify complete'))
        })
        .pipe($.rename({extname: '.min.js'}))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(config.dest))
        .pipe($.livereload(client));
});

gulp.task('templates', function () {
    var templateConfig = {
        file: 'templates.js',
        options: {
            module: config.appName,
            root: 'app/',
            standAlone: false
        }
    };

    return gulp.src(config.templates)
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache(
            templateConfig.file,
            templateConfig.options
        ))
        .pipe(gulp.dest(config.dest))
        .pipe($.livereload(client));
});

gulp.task('css', ['fonts'], function () {
    var src = envConfig.isGirlsDojo ? config.girlsLess : config.less;

    return gulp.src(src)
        .pipe($.less())
        .pipe($.autoprefixer('last 2 versions', 'ie 8', 'ie 9'))
        .pipe($.minifyCss({compatibility: 'ie8'}))
        .pipe($.rename({extname: '.min.css'}))
        .pipe(gulp.dest(config.dest))
        .pipe($.livereload(client));
});

gulp.task('images', function () {
    return gulp.src(config.images)
        //.pipe($.imagemin()) Note: cannot use image min behind the proxy
        .pipe(gulp.dest(config.dest + '/images'))
        .pipe($.livereload(client));
});

gulp.task('fonts', function () {
    return gulp.src(config.fonts)
        .pipe(gulp.dest('build/fonts'))
        .pipe($.livereload(client));
});

gulp.task('browserify', function () {
    return browserify({entries: config.browserify.entries})
        .bundle()
        .pipe(source(config.browserify.bundleName))
        .pipe(gulp.dest(config.dest))
        .pipe($.livereload(client));
});

gulp.task('dev:inject', function () {
    var injectConfig = {ignorePath: 'build/', addRootSlash: false};

    var libStream      = gulp.src(config.dest + '/libs.js', {read: false});
    var appStream      = gulp.src([config.dest + '/' + config.appName + '.js'], {read: false});
    var otherAppStream = gulp.src([config.dest + '/*.js', '!' + config.dest + '/libs.js', '!' + config.dest + '/' + config.appName + '.js'], {read: false});
    var cssStream      = gulp.src(config.dest + '/' + config.appName + '.min.css', {read: false});

    return gulp.src('client/index.html')
        .pipe($.inject(cssStream, injectConfig))
        .pipe($.inject(series(libStream, appStream, otherAppStream), injectConfig))
        .pipe(gulp.dest(config.dest))
        .pipe($.livereload(client));
});

gulp.task('inject', function () {
    var injectConfig = {ignorePath: 'build/', addRootSlash: false};

    var libStream      = gulp.src(config.dest + '/libs.js', {read: false});
    var appStream      = gulp.src([config.dest + '/' + config.appName + '.min.js'], {read: false});
    var otherAppStream = gulp.src([config.dest + '/*.js', '!' + config.dest + '/libs.js', '!' + config.dest + '/' + config.appName + '.min.js'], {read: false});
    var cssStream      = gulp.src(config.dest + '/' + config.appName + '.min.css', {read: false});

    return gulp.src('client/index.html')
        .pipe($.inject(cssStream, injectConfig))
        .pipe($.inject(series(libStream, appStream, otherAppStream), injectConfig))
        .pipe(gulp.dest(config.dest))
        .pipe($.livereload(client));
});

gulp.task('express', ['dev', 'inject'], function () {
    var app   = require('./server/app.js');
    app.use(express.static(config.dest));
    app.listen(config.ports.app, function () {
        $.util.log($.util.colors.magenta('Listening on', config.ports.app));
    });
});

gulp.task('reload', ['dev', 'express'], function () {
    client.listen(config.ports.liveReload, function () {
        $.util.log($.util.colors.cyan('Reload listening on', config.ports.liveReload));
    });
});

gulp.task('watch', ['dev', 'express', 'reload'], function () {
    gulp.watch(config.js, ['scripts', 'browserify', 'inject']);
    gulp.watch([config.less, 'client/styles/**'], ['css', 'inject']);
    gulp.watch(config.templates, ['templates', 'inject']);
    gulp.watch('client/index.html', ['dev']);

    gulp.watch(['gulp.config.js', 'gulpfile.js', 'package.json'], ['dev']);

    gulp.watch(config.dest + '/**').on('change', function () {
        client.changed({body: {files: [config.dest + '/**/*']}})
    });
});

gulp.task('open', ['watch'], function () {
    gulp.src('')
        .pipe($.open({app: 'chrome', uri: 'http://localhost:' + config.ports.app}));
});

gulp.task('preBuild', ['lint', 'ng-config', 'dist:scripts', 'templates', 'css', 'images', 'fonts', 'browserify']);

gulp.task('build', function (cb) {
    runSequence('clean', 'preBuild', 'inject', cb);
});

gulp.task('dev:preBuild', ['lint', 'ng-config', 'scripts', 'templates', 'css', 'images', 'fonts', 'browserify']);
gulp.task('dev', function (cb) {
    runSequence('dev:preBuild', 'dev:inject', cb);
});
gulp.task('default', function (cb) {
    runSequence('clean', ['dev', 'express', 'reload', 'watch', 'open'], cb);
});

gulp.task('dist', ['build'], function () {
    gulp.src(config.dest + '/**/*')
        .pipe(gulp.dest('dist'));
});