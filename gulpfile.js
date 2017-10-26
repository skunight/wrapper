const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const nodemon = require('gulp-nodemon')
const clean = require('gulp-clean')
const path = require('path')
const eslint = require('gulp-eslint')
const mocha = require('gulp-mocha')
// const Cache = require('gulp-file-cache')
const del = require('del')
// const cache = new Cache()

gulp.task('eslint',() => {
  return gulp.src(['src/**/*.js','!src/models/mysql/**','!src/test/**'])
             .pipe(eslint())
             .pipe(eslint.format())
             .pipe(eslint.failAfterError())
})

gulp.task('mocha',() => {
  return gulp.src('test/*.js')
             .pipe(mocha({reporter: 'doc'}))
})

gulp.task('compile', function () {
  const stream = gulp.src('./src/**/*.js')
    .pipe(sourcemaps.init())
    // .pipe(cache.filter())
    .pipe(babel())
    // .pipe(cache.cache())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
  return stream
})

gulp.task('clean',function(){
  var stream = gulp.src('dist')
  .pipe(clean())
  return stream
})

gulp.task('copyKey',function(){
  var stream = gulp.src('src/key/**/*')
  .pipe(gulp.dest('dist/key'))
  return stream
})

gulp.task('start',function () {
  nodemon({
    script: 'dist/app',
    watch:'src',
    tasks:['compile'],
    env: { 'NODE_ENV': 'development' },
    // env: { 'NODE_ENV': 'production' }
  })
})

gulp.task('release',['clean'],function(){
  gulp.start(['copyKey','compile'])
})

gulp.task('dev',['compile','copyKey'],function(){
  gulp.start('start')
})
