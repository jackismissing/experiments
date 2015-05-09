var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserify  = require('gulp-browserify');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('styles', function () 
{
    gulp.src('./assets/sass/*.scss')
        .pipe(sass({errLogToConsole: true}))
        .on('error', swallowError)
        .pipe(gulp.dest('./build/assets/css'))
        .pipe(reload({stream: true}));
});

gulp.task('scripts', function() 
{
    // Main js bundle
    gulp.src('./js/app.js')
        .pipe(browserify())
        .on('error', swallowError)
        .pipe(gulp.dest('./build/js'))
        .pipe(reload({stream: true}));
});

gulp.task('browser-sync', function()
{
    browserSync(
    {
        server: 
        {
            baseDir: "./build"
        }
    })
});

gulp.task('watch', function() 
{
    gulp.watch('./assets/sass/*.scss', ['styles']);
    gulp.watch('./js/*.js',  ['scripts']);
});

gulp.task('default', ['watch', 'browser-sync']);

function swallowError(e) {
    console.log(e.toString());
};