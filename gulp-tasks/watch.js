var project = require('./_project.js');
var gulp    = require('gulp');

gulp.task("watch", function () {
  gulp.watch([project.buildSrc + "/scss/**/*"], gulp.parallel('styles'));
});
