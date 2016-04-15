var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var flatten = require('gulp-flatten');
var plumber = require('gulp-plumber');
//var runSequence = require('run-sequence');
var ngTemplate = require('gulp-angular-templatecache');
var ngGettext = require('gulp-angular-gettext');
//var manifest = require('asset-builder')('./manifest.json');
var watch = require('gulp-watch');
var imageMin = require('gulp-imagemin');

//default task which runs with every start of gulp
gulp.task('default', ['watch']);

//defines the gulp task for every js file
gulp.task('js', function(){
    return gulp.src('source/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
            .pipe(sourcemaps.init())
                .(concat('main.js'))
                //Only uglifies the js files when you run gulp using '--type production', that means only when we are finishing a release
                .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
            .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/js'));
});

//defines the gulp task for every sass file
gulp.task('sass', function() {
  return gulp.src('source/sass/**/*.scss')
    .pipe(sourcemaps.init())  // Process the original sources
      .pipe(sass())
    .pipe(sourcemaps.write()) // Add the map to modified source.
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/assets/css'));
});

//defines the watch task
gulp.task('watch', function(){
    gulp.watch('source/js/*js, ['js']');
    gulp.watch('source/sass/*scss', ['sass']);
});
