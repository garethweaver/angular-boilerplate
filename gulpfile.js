const gulp = require('gulp')
const del = require('del')
const merge = require('merge-stream')
const source = require('vinyl-source-stream')
const pug = require('gulp-pug')
const browserify = require('browserify')
const babelify = require('babelify')
const tsify = require('tsify')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const autoprefixerOptions = { browsers: ['last 2 versions', '> 2%'] }


gulp.task('clean', () => {
  return del('dist/**/*')
})

gulp.task('html:move', () => {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist/'))
})

gulp.task('html:watch', () => {
  return gulp.watch(['./src/**/*.html'], ['html:move'])
})

gulp.task('pug:compile', () => {
  return gulp.src('./src/**/*.pug')
    .pipe(pug({
      doctype: 'html',
      pretty: true
    }))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('pug:watch', () => {
  return gulp.watch(['./src/**/*.pug'], ['pug:compile'])
})

// 'systemjs/dist/system-polyfills.js',
// 'systemjs/dist/system.src.js',
// 'rxjs/**/*.js',

gulp.task('libs:move', () => {
  return gulp.src([
      'reflect-metadata/Reflect.js',
      'zone.js/dist/zone.min.js',
      'core-js/client/shim.min.js'
    ], { cwd: 'node_modules/**' })
    .pipe(gulp.dest('dist/lib'))
})

gulp.task('sass:compile', () => {
  var sassGlobal =
    gulp.src('./src/styles/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('./dist/'))

  var sassComponent =
    gulp.src('./src/app/components/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('./dist/app/components/'))

  return merge(sassGlobal, sassComponent)
})

gulp.task('sass:watch', () => {
  gulp.watch(['./src/**/*.sass'], ['sass:compile'])
})

gulp.task('ts:compile', () => {
  return browserify({
      basedir: '.',
      debug: true,
      entries: ['src/app/main.ts'],
      cache: {},
      packageCache: {}
    })
    .plugin(tsify)
    .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts']
    })
    .bundle()
    .pipe(source('app/main.js'))
    .pipe(gulp.dest('dist'))
})

gulp.task('ts:watch', () => {
  gulp.watch(['./src/app/**/*.ts'], ['ts:compile'])
});

gulp.task('build',['html:move', 'libs:move  ', 'sass:compile', 'ts:compile'])
gulp.task('watch',['html:watch', 'sass:watch', 'ts:watch'])
