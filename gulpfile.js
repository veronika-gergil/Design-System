const gulp = require('gulp')

const sync = require('browser-sync').create();
const clean = require("gulp-clean");
const fs = require('fs')
const path = require('path');

const sass = require('gulp-sass')(require('sass'))
const plumber = require("gulp-plumber");
const sourcemap = require('gulp-sourcemaps')
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const csso = require('postcss-csso')

const htmlmin = require('gulp-htmlmin')
const fileinclude = require('gulp-file-include')

const babel = require('gulp-babel')
const webpack = require('webpack-stream')

const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin')
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');

// Styles

gulp.task('styles', () => {
  return gulp
    .src('./source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream())
})

// HTML

gulp.task('html', () => {
  return gulp
    .src('./source/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
})

// Scripts

gulp.task('scripts', () => {
  return gulp
    .src('./source/js/*.js')
    .pipe(babel())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('build/js'))
    .pipe(sync.stream())
})

// Images

gulp.task('optimizeImages', () => {
  return gulp
    .src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
})

gulp.task('copyImages', () => {
  return gulp
    .src('source/img/**/*.{png,jpg,svg}')
    .pipe(gulp.dest('build/img'))
})

// WebP

gulp.task('createWebp', () => {
  return gulp
    .src('source/img/**/*.{jpg,png}')
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('build/img'))
})

// Sprite

gulp.task('sprite', () => {
  return gulp
    .src('source/img/icons/*.svg')
    .pipe(svgmin((file) => {
      const prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      }
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(gulp.dest('build/img'));
})

// Copy

gulp.task('copy', (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/img/**/*.svg",
    "!source/img/icons/*.svg",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
})

// Server

gulp.task('server', (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
})

// Reload

gulp.task('reload', (done) => {
  sync.reload()
  done()
})

// Clean

gulp.task('clean', (done) => {
  if (fs.existsSync('./build')) {
    return gulp
      .src('./build', { read: false })
      .pipe(clean())
  }
  done()
})

// Watcher

gulp.task('watcher', () => {
  gulp.watch('./source/sass/**/*.scss', gulp.series('styles'))
  gulp.watch('./source/js/**/*.js', gulp.series('scripts'))
  gulp.watch('./source/blocks/*.html', gulp.series('html', 'reload'))
  gulp.watch('./source/*.html', gulp.series('html', 'reload'))
})

// Build

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'optimizeImages',
  gulp.parallel(
    'styles',
    'html',
    'scripts',
    'sprite',
    'createWebp'
  )
))

// Default

gulp.task('default', gulp.series(
  'clean',
  'copy',
  'copyImages',
  gulp.parallel(
    'styles',
    'html',
    'scripts',
    'sprite',
    'createWebp'
  ),
  gulp.series(
    'server',
    'watcher'
  )
))
