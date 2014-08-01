var gulp = require('gulp');
var run = require('gulp-run');
var fs = require('fs');

gulp.task('dist', function() {

  fs.unlink('../distribution/r2.js', function (err) {
    if (err) { console.log(err.message); };
    //run("cp src/r2.js ../distribution/r2.js").exec();
    gulp.src('src/r2.js').pipe(gulp.dest('../distribution'));
  });

  fs.unlink('../distribution/r2.md', function (err) {
    if (err) { console.log(err.message); };
    //run("cp src/r2.md ../distribution/r2.md").exec();
    gulp.src('src/r2.md').pipe(gulp.dest('../distribution'));
  });

  /* to ES5 */
  fs.unlink('../distribution/r2.es5.js', function (err) {
    if (err) { console.log(err.message); };
    run("traceur --out ../distribution/r2.es5.js src/r2.launcher.js --modules=inline --source-maps").exec();
  });

});

gulp.task('default', function() {

});

