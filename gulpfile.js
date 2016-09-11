var gulp = require('gulp'),
    sass                = require('gulp-sass'),
    concat              = require('gulp-concat'),
    uglify              = require('gulp-uglifyjs'),
    del                 = require('del'),
    cssnano             = require('gulp-cssnano'),
    rename              = require('gulp-rename'),
    open                = require('gulp-open'),
    connect             = require('gulp-connect');



var serve_host      = "localhost",
    port_dev        = 88,
    port_dist       = 89,
    serve_browser   = 'chrome';


gulp.task('default', ['serve']);







gulp.task('styles', function(){
    return gulp.src('src/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('src/css'));
});



gulp.task('vendors', function() {
    return gulp.src([
        'src/vendor/angular/angular.js',
        'src/vendor/angular-animate/angular-animate.js',
        'src/vendor/angular-aria/angular-aria.js',
        'src/vendor/angular-material/angular-material.js',
        'src/vendor/angular-resource/angular-resource.js',
        'src/vendor/angular-ui-router/release/angular-ui-router.js'

    ])
        .pipe(concat('vendors.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'));
});











gulp.task('apps', function() {
    return gulp.src([
        'src/app/app.module.js',
        'src/app/app.config.js',
        'src/app/app.alert.js',
        'src/module/book/module.book.js',
        'src/module/book/module.book.api.js',
        'src/module/book/module.book.directives.js',
        'src/module/book/module.book.config.js'
        ,'src/module/book/module.book.controllers.js'
        ,'src/module/book/module.book.filters.js'
    ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'));
});


gulp.task('clearDist', function() {
    return del.sync('dist');
});




gulp.task('build', ['clearDist', 'styles', 'vendors', 'apps'], function() {
    gulp.src('src/js/**/*').pipe(gulp.dest('dist/js'));
    gulp.src('src/img/*').pipe(gulp.dest('dist/img'));
    gulp.src(['src/css/vendors.min.css','src/css/main.min.css']).pipe(gulp.dest('dist/css'));
    gulp.src(['src/templates/**/*.html']).pipe(gulp.dest('dist/templates'));
    gulp.src(['src/*.html']).pipe(gulp.dest('dist'));
});




gulp.task('serve', ['build'], function(){
    connect.server({
        root: 'src',
        port: port_dev,
        host: serve_host,
        fallback: './src/index.html'

    });

    gulp.src('').pipe(open({
            uri: 'http://'+serve_host+':'+port_dev,
            app: serve_browser
        }));
});


gulp.task('serve-dist', ['build'], function(){
    connect.server({
        root: 'dist',
        port: port_dist,
        host: serve_host,
        fallback: 'dist/index.html'
    });

    gulp.src('').pipe(open({
            uri: 'http://'+serve_host+':'+port_dist,
            app: serve_browser
        }));
});


