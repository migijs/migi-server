const gulp = require('gulp');
const util = require('gulp-util');
const rename = require('gulp-rename');
const through2 = require('through2');
const lefty = require('lefty');
const jaw = require('jaw');
const babel = require('babel-core');

const path = require('path');

gulp.task('default', function() {
  gulp.src('./tests/**/*.jsx')
    .pipe(through2.obj(jsx))
    .pipe(rename({
      extname:'.js'
    }))
    .pipe(gulp.dest('./tests/'));
});

gulp.task('watch', function() {
  gulp.watch('./tests/**/*.jsx', function(file) {
    gulp.src(file.path)
      .pipe(through2.obj(jsx))
      .pipe(rename({
        extname:'.js'
      }))
      .pipe(gulp.dest(path.dirname(file.path)));
  });
});

function jsx(file, enc, cb) {
  util.log(path.relative(file.cwd, file.path));
  let content = file.contents.toString('utf-8');
  if(content.indexOf('`') > -1) {
    content = content.replace(/`([^`]+)`/g, function($0, $1) {
      return JSON.stringify(jaw.parse($1));
    });
  }
  content = lefty.parse(content);
  content = babel.transform(content, {
    presets: ['es2015']
  }).code;
  file.contents = new Buffer(content);
  cb(null, file);
}
