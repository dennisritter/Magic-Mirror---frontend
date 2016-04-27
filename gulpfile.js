var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var ngTemplate = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var flatten = require('gulp-flatten');
var gutil = require('gulp-util');
var watch = require('gulp-watch');

//Import the manifest file
var manifest = require('asset-builder')('./manifest.json');

//Initialize all var according to the mainifest.json
var globs = manifest.globs;
var project = manifest.getProjectGlobs();
var paths = manifest.paths;

//default task which runs with every start of gulp
gulp.task('default', ['watch']);

//defines the gulp task for every first party js file
gulp.task('js_app', function(){
    var js = manifest.getDependencyByName("app.js");
    return gulp.src(js.globs)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(sourcemaps.init())
    .pipe(concat(js.name))
    //Only uglifies the js files when you run gulp using '--type production', that means only when we are finishing a release
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist.scripts));
});

//defines the gulp task for every third party js file
gulp.task('js_libs', function(){
    var js = manifest.getDependencyByName("libs.js");
    return gulp.src(js.globs)
    .pipe(sourcemaps.init())
    .pipe(concat(js.name))
    //Only uglifies the js files when you run gulp using '--type production', that means only when we are finishing a release
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist.scripts));
});

//defines the gulp task for every template file
gulp.task( 'templates', function () {
  var templates = manifest.getDependencyByName( 'templates.js' );
  return gulp.src( templates.globs )
    .pipe( minifyHtml() )
    .pipe( ngTemplate( {
      module: manifest.config.ngModuleName
    } ) )
    .pipe( concat( templates.name ) )
    .pipe( uglify() )
    .pipe( gulp.dest( paths.dist.scripts ) );
} );

//defines the gulp task for every sass file
gulp.task('css', function() {
    var css = manifest.getDependencyByName("main.css");
    return gulp.src(css.globs)
    .pipe(sourcemaps.init())  // Process the original sources
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(sourcemaps.write()) // Add the map to modified source.
    .pipe(gulp.dest(paths.dist.styles));
});

gulp.task( 'images', [], function () {
  return gulp.src( paths.imageSource )
    .pipe( imageMin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe( gulp.dest( paths.dist.images ) );
} );

//defines the watch task
gulp.task('watch', function(){
    watch(paths.source + 'scripts/**/*.js', function(){
        gulp.start('js_app');
    });

    watch(paths.source + 'styles/sass/**/*scss', function(){
        gulp.start('css');
    });

    watch( paths.imageSource, function () {
        gulp.start('images');
    });

    watch( paths.source + 'templates/**/*.html', function () {
    gulp.start('templates');
    });
});
