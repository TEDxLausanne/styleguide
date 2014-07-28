/* ==========================================================
 * gulpfile.js
 * List of Gulp.js task to build and run the project
 *
 * Author: Marc Friederich, m.friederich@me.com
 * Date:   2014-07-28 21:30:14
 *
 * Licensed under MIT
 *
 ========================================================== */

 var gulp = require('gulp'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    shell = require('gulp-shell'),
    stylish = require('jshint-stylish');

// JS task
gulp.task('scripts', function() {
  gulp.src('./assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// Build vendors
gulp.task('vendors', function() {

  gulp.src([
      './bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*'
    ])
    .pipe(gulp.dest('build/css/bootstrap'));


  // gulp.src([
  //         './bower_components/yamm3/yamm/yamm.css',
  //     ])
  //     .pipe(concat('vendors.min.css'))
  //     .pipe(minifycss())
  //     .pipe(gulp.dest('./build/css'));

  gulp.src([
      './bower_components/jquery/jquery.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/affix.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/alert.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/carousel.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/popover.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/scrollspy.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tab.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js',
    ])
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('polyfills', function() {
  return gulp.src([
      './bower_components/html5shiv/dist/html5shiv.min.js',
      './bower_components/html5shiv/dist/html5shiv-printshiv.min.js',
      './bower_components/respond/dest/respond.min.js'
    ])
    .pipe(concat('polyfills.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});


// SASS compile, autoprefix and minify task
gulp.task('styles', function() {
  return gulp.src('assets/sass/style.scss')
    .pipe(sass())
      .on('error', gutil.beep)
      .on('error', notify.onError("Error: <%= error.message %>"))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest('build/css'))
    .pipe(minifycss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('print', function() {
  return gulp.src('assets/sass/print/print.scss')
    .pipe(sass())
      .on('error', gutil.beep)
      .on('error', notify.onError("Error: <%= error.message %>"))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest('build/css'))
    .pipe(minifycss())
    .pipe(rename('print.min.css'))
    .pipe(gulp.dest('build/css'));
});


gulp.task('browser-sync', function() {
    browserSync.init({
      open: false,
      reloadDelay: 2000,
      server: {
          baseDir: "styleguide"
      }
    });
});


gulp.task('hologram', shell.task([
  'hologram'
]));

gulp.task('build-images', function() {
  return gulp.src(['assets/img/**'])
          .pipe(gulp.dest('build/img'));
});

// gulp.task('build-fonts', function() {
//   return gulp.src(['assets/fonts/**'])
//           .pipe(gulp.dest('build/fonts'));
// });

gulp.task('build-pages', function() {
  gulp.src(['assets/pages/**'])
    .pipe(gulp.dest('styleguide/pages'));
});

gulp.task('default', ['styles', 'print', 'watch', 'vendors', 'browser-sync', 'scripts', 'build-images', 'build-pages']);
gulp.task('build', ['styles', 'print', 'scripts', 'vendors', 'build-images', 'build-pages']);

gulp.task('watch',['styles', 'print', 'scripts', 'vendors', 'build-images', 'build-pages'], function() {
  gulp.watch('assets/sass/**/*.scss', ['styles', 'print']);
  gulp.watch('assets/js/*.js', ['scripts']);
  gulp.watch('build/**/*.{js,css}', ['hologram']);
  gulp.watch(['assets/img/**/*.{jpg,png,gif,svg}'], ['build-images']);
  gulp.watch(['assets/pages/**/*.html'], ['build-pages']);
});