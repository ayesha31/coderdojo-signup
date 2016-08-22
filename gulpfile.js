'use strict';

var gulp = require('gulp');
var config = require('./gulp.config.js');

var $ = require('gulp-load-plugins')({lazy: true});
var del = require('del');
var browserify = require('browserify');
var browserifyCss = require('browserify-css');
var path = require('path');
var fse = require('fs-extra');
var _ = require('lodash');
var source = require('vinyl-source-stream');
var series = require('stream-series');
var client = require('tiny-lr')();
var express = require('express');
var runSequence = require('run-sequence');
var server = require('./server.js');


gulp.task('clean', function (cb) {
    del([config.dest, 'temp'], {force: true}, cb);
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

gulp.task('scripts', ['lint'], function () {
    return gulp.src(config.js)
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
    return gulp.src(config.less)
        .pipe($.less())
        .pipe($.autoprefixer('last 2 versions', 'ie 8', 'ie 9'))
        .pipe(gulp.dest('temp'))
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
        .pipe(gulp.dest('temp/fonts'))
        .pipe($.livereload(client));
});

gulp.task('browserify', ['css', 'fonts'], function () {
    function processRelativeUrl(relativeUrl) {
        var stripQueryStringAndHashFromPath = function (url) {
            return url.split('?')[0].split('#')[0];
        };
        var rootDir = path.resolve(process.cwd(), config.dest);
        var relativePath = stripQueryStringAndHashFromPath(relativeUrl);
        var queryStringAndHash = relativeUrl.substring(relativePath.length);

        relativePath = relativePath.replace(/\\/g, '/');

        var libPrefix = '../lib/';
        var bwPrefix = '../temp/';

        function copy(prefix) {
            var locationPath = relativePath.substring(prefix.length);
            var match = locationPath.match(/\/(fonts\/.*)/);
            locationPath = match ? match[1] : locationPath;
            var source = path.join(rootDir, relativePath);
            var target = path.join(rootDir, locationPath);

            fse.copySync(source, target);
            return locationPath + queryStringAndHash;
        }

        if (_.startsWith(relativePath, libPrefix)) {
            return copy(libPrefix);
        }
        else if (_.startsWith(relativePath, bwPrefix)) {
            return copy(bwPrefix);
        }

        return relativeUrl;
    }

    return browserify({entries: config.browserify.entries})
        .transform(browserifyCss, {
            global: true,
            autoInject: true,
            minify: true,
            rootDir: config.dest,
            processRelativeUrl: processRelativeUrl
        })
        .bundle()
        .pipe(source(config.browserify.bundleName))
        .pipe(gulp.dest(config.dest))
        .pipe($.livereload(client));
});

gulp.task('inject', ['preBuild'], function () {
    var injectConfig = {ignorePath: 'build/', addRootSlash: false};

    var libStream = gulp.src(config.dest + '/libs.js', {read: false});
    var appStream = gulp.src([config.dest + '/*.js', '!' + config.dest + '/libs.js'], {read: false});

    return gulp.src('client/index.html')
        .pipe($.inject(series(libStream, appStream), injectConfig))
        .pipe(gulp.dest(config.dest))
        .pipe($.livereload(client));
});

gulp.task('express', ['build', 'inject'], function () {
  var port = server.get('port');

  server.use(express.static(config.dest));
  server.listen(port, function () {
    $.util.log($.util.colors.magenta('Listening on ' + server.get('base url') + ':' + port));
  });
});

gulp.task('reload', ['build', 'express'], function () {
    client.listen(config.ports.liveReload, function () {
        $.util.log($.util.colors.cyan('Reload listening on', config.ports.liveReload));
    });
});

gulp.task('watch', ['build', 'express', 'reload'], function () {
    gulp.watch(config.js, ['scripts', 'browserify', 'inject']);
    gulp.watch([config.less, 'client/styles/**'], ['browserify', 'inject']);
    gulp.watch(config.templates, ['templates', 'inject']);
    gulp.watch(config.cssLibs, ['browserify', 'inject']);
    gulp.watch('client/index.html', ['build']);

    gulp.watch(['gulp.config.js', 'gulpfile.js', 'package.json'], ['build']);

    gulp.watch(config.dest + '/**').on('change', function () {
        client.changed({body: {files: [config.dest + '/**/*']}})
    });
});

gulp.task('open', ['watch'], function () {
    gulp.src('')
        .pipe($.open({app: 'chrome', uri: 'http://localhost:' + config.ports.app}));
});


gulp.task('preBuild', ['lint', 'scripts', 'templates', 'css', 'images', 'fonts', 'browserify']);
gulp.task('build', ['preBuild', 'inject']);
gulp.task('default', function (cb) {
    runSequence('clean', ['build', 'express', 'reload', 'watch', 'open'], cb)
});

gulp.task('dist', ['build'], function () {
    gulp.src(config.dest + '/**/*')
        .pipe(gulp.dest('dist'));
});
