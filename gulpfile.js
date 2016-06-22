var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-clean-css');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var ngTemplate = require('gulp-angular-templatecache');
var imageMin = require('gulp-imagemin');
var flatten = require('gulp-flatten');


// default task which runs with every start of gulp
gulp.task('default', ['serve']);

//Import the manifest file
var manifest = require('asset-builder')('./manifest.json');

//Initialize all vars according to the mainifest.json
var globs = manifest.globs;
var project = manifest.getProjectGlobs();
var paths = manifest.paths;

//Import the browsersync plugin
var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');
var middleware = historyApiFallback({
    verbose: true,
});
//Initialize the browser-sync server @ perna.dev
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: paths.distribution,
            middleware: [ middleware ]
        },
        browser: "google chrome",
    });
    //BrowserSync specific watch tasks
    gulp.watch(paths.source + 'styles/sass/**/*scss', ['css']);
    gulp.watch(paths.source + 'templates/**/*.html', ['templates']);
    gulp.watch(paths.source + 'scripts/**/*.js', ['js_app']);
    gulp.watch(paths.bowerJSON, ['js_libs']);
    gulp.watch(paths.imageSource, ['images']);
});

//defines the gulp task for every first party js file
gulp.task('js_app', function(){
    var js = manifest.getDependencyByName("app.js");
    return gulp.src(js.globs)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(sourcemaps.init())
    .pipe(concat(js.name))
    /**
    Only uglifies the js files when you run gulp using '--type production',
    that means only when we are finishing a release
    **/
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(paths.dist.scripts))
    .pipe(browserSync.stream());
});

//defines the gulp task for every third party js file
gulp.task('js_libs', function(){
    var js = manifest.getDependencyByName("libs.js");
    return gulp.src(js.globs)
    .pipe(sourcemaps.init())
    .pipe(concat(js.name))
    .pipe( uglify() )
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(paths.dist.scripts));
});

//defines the gulp task for every sass file
gulp.task('css', function() {
    var css = manifest.getDependencyByName("main.css");
    return gulp.src(css.globs)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(concat(css.name))
    .pipe(minifyCss())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(paths.dist.styles))
    .pipe(browserSync.stream());
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
    /**
    Only uglifies the js files when you run gulp using '--type production',
    that means only when we are finishing a release
    **/
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe( gulp.dest( paths.dist.scripts ) )
    .pipe(browserSync.stream());
} );

//defines the gulp task to process all images
gulp.task( 'images', [], function () {
    return gulp.src( paths.imageSource )
    .pipe( imageMin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe( gulp.dest( paths.dist.images ) )
    .pipe(browserSync.stream());
} );

gulp.task( 'fonts', [], function () {
    return gulp.src( globs.fonts )
        .pipe( flatten() )
        .pipe( gulp.dest( paths.dist.fonts ) );
} );

//Runs all tasks in sequence
gulp.task( 'build', function () {
    return runSequence( [
        'js_app',
        'js_libs',
        'css',
        'templates',
        'images',
        'fonts'
    ] );
} );
