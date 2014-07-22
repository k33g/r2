var gulp = require('gulp');
var run = require('gulp-run');
var fs = require('fs');

gulp.task('dist', function() {

});

/* to ES5 */
gulp.task('default', function() {
  //'public/js/**/*.js'
  gulp.watch(['src/**/*.js'], function(event) {
    console.log('File '+event.path+' was '+event.type);

    fs.unlink('distribution/r2.js', function (err) {
      if (err) { console.log(err.message); };
      //run("traceur --out distribution/r2.js src/r2/*.js --modules=inline --source-maps").exec();
      run("traceur --out distribution/r2.js src/r2.js --modules=inline --source-maps").exec();
    });

    fs.unlink('try/r2.tests.js', function (err) {
      if (err) { console.log(err.message); };
      run("traceur --out try/r2.tests.js src/tests.js --modules=inline --source-maps").exec();
    });
  });



});


//'!public/js/app-build.js'

