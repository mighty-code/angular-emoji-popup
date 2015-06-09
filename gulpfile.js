var gulp = require("gulp");
var bower = require("gulp-bower");
var elixir = require("laravel-elixir");

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

var paths = {
    'bootstrap': 'bower_components/bootstrap/dist',
    'jquery': 'bower_components/jquery/dist',
    'nanoscroller': 'bower_components/nanoscroller/bin',
    'angular': 'bower_components/angular',
    'angularsanitize': 'bower_components/angular-sanitize'
};

elixir.config.sourcemaps = false;

gulp.task('bower', function () {
    return bower();
});

elixir(function (mix) {
    // Run bower install
    mix.task('bower');

    // Copy fonts straight to public
    mix.copy(paths.bootstrap + 'fonts', 'dist/fonts');
    mix.copy('src/img/*.png', 'dist/img/');
    mix.copy('src/img/*.gif', 'dist/img/');

    mix.less([
        '../../../src/less/nanoscroller.less',
        '../../../src/less/emoji.less',
        '../../../src/less/style.less',
    ], 'dist/css/angular-emoji.min.css');

    // Merge all css for site
    mix.styles([
        paths.bootstrap + '/css/bootstrap.css',
    ], 'dist/css/angular-emoji-vendor.min.css', './');

    // Merge custom scripts backend
    mix.scripts([
        paths.jquery + '/jquery.js',
        paths.bootstrap + '/js/bootstrap.js',
        paths.nanoscroller + '/javascripts/jquery.nanoscroller.js',
        paths.angular + '/angular.js',
        paths.angularsanitize + '/angular-sanitize.js',
    ], 'dist/js/angular-emoji-vendor.min.js', './');

    // Merge custom scripts backend
    mix.scripts([
        '/src/js/app.js',
        '/src/js/config.js',
        '/src/js/util.js',
        '/src/js/jquery.emojiarea.custom.js',
        '/src/js/emojiDirectives.js',
        '/src/js/emojiFilters.js'
    ], 'dist/js/angular-emoji.min.js', './');
});
