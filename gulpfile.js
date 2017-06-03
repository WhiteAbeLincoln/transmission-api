const gulp = require('gulp')
const ts = require('gulp-typescript')
const tsproj = ts.createProject('tsconfig.json')
const sourcemaps = require('gulp-sourcemaps');
const mocha = require('gulp-mocha');
const merge = require('merge2');
const clean = require('gulp-clean');

gulp.task('clean', () => {
    return gulp.src('dist', {read:false}).pipe(clean());
});

gulp.task('build', ['clean'], () => {
    let tsResult = tsproj.src()
        .pipe(sourcemaps.init())
        .pipe(tsproj());

        return merge([
            tsResult.dts.pipe(gulp.dest('dist/defs')),
            tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest('dist'))
        ]);
});

gulp.task('test', () => {
    gulp.src('dist/test/tests.js')
        .pipe(mocha());
});

gulp.task('default', ['build']);