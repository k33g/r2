var gulp = require('gulp');
var run = require('gulp-run');
var fs = require('fs');

gulp.task('dist', function() {

  fs.unlink('../r2.js', function (err) {
    if (err) { console.log(err.message); };
    gulp.src('src/r2.js').pipe(gulp.dest('../'));
  });

  fs.unlink('../r2.md', function (err) {
    if (err) { console.log(err.message); };
    gulp.src('src/r2.md').pipe(gulp.dest('../'));
  });

});

gulp.task('transpile', function() {

  /* to ES5 */
  fs.unlink('../r2.es5.js', function (err) {
    if (err) { console.log(err.message); };
    run("traceur --out ../r2.es5.js src/r2.launcher.js --modules=inline --source-maps").exec();
  });

});


gulp.task('default', function() {

});

