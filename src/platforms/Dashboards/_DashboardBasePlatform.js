/**
 * This platform is not meant to be used directly
 */
const Platform = require('../../qdt/Platform');

// set platform source and destination folder
platform = new Platform('forus-platform');

// add libs to bundle (see libs folder)
platform.setLibs([
    // "bootstrap3",
    "babel_polyfill",
    "angular",
    "angular_cookies",
    "angular_datepicker",
    "angular_sanitize",
    "angular_translate",
    "angular_translate_storage_cookies",
    "angular_translate_storage_local",
    "chart_js",
    "filesaver",
    "jquery",
    "mdi",
    "moment",
    "nanoscroller",
    "papaparse",
    "progressbar_js",
    "qrcodejs",
    "ui_cropper",
    "ui_router",
    "underscore",
    "underscore.string",
]);

// files to be copied to destination path (relative to source folder)
platform.copyAsset("resources/**/*", "./");

// add js task
platform.addTask('js', {
    src: [
        "app.js"
    ],
    watch: [
        "angular-1/**/**.js",
    ],
    dest: "/",
    name: "app.min.js",
    minify: false,
    sourcemap: true,
    browserify: true
}, 'js');

// add scss task
platform.addTask('scss', {
    src: "general/style.scss",
    watch: [
        "_common/**/*.scss",
        "general/**/*.scss"
    ],
    path: "/",
    name: "style.min.css",
    minify: true
}, 'scss');

// add pug task
platform.addTask('pug', {
    path: "/angular-index",
    src: [
        "angular-index/index.pug"
    ],
    watch: [
        "layout/**/*.pug"
    ],
    minify: true
}, 'pug');

// add pug task
platform.addTask('pug', {
    path: "/tpl",
    src: [
        "tpl/**/*.pug"
    ],
    dest: "/assets/tpl",
    minify: true
}, 'pug_raw');

module.exports = platform;