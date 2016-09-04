'use strict';

module.exports = {
    appName: 'coderdojo-signup',
    dest: 'build',
    js: [
        '!client/app/index.js',
        'client/app/**/*.js',
        'client/app/**/*test.js'
    ],
    templates: [
        'client/app/**/*.html'
    ],
    less: [
        'client/styles/coderdojo-signup.less'
    ],
    cssLibs: [
        'node_modules/font-awesome/css/font-awesome.min.css'
    ],
    fonts: [
        'client/fonts/**/*'
    ],
    images: [
        'client/images/**/*'
    ],
    tests: [
        'client/app/**/*test.js'
    ],
    browserify: {
        entries: ['client/app/index.js'],
        bundleName: 'libs.js'
    },
    ports: {
        liveReload: 35729,
        app: 5000
    }
};
