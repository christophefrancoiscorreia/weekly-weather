const { src, dest, watch, series }  = require("gulp");
const minify = require("gulp-minify");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const sourcemaps = require('gulp-sourcemaps');
const replaceName = require('gulp-replace-name');
const imagemin = require('gulp-imagemin');

sass.compiler = require('node-sass');


function compileSass() {

    return src('assets/sass/**/*', { allowEmpty: true })
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('assets/maps'))
        .pipe(dest('assets/css'));
}

function f_imagemin() {
    return src('assets/img/*')
        .pipe(imagemin())
        .pipe(replaceName(/'"]/g, ''))
        .pipe(replaceName(/[`~!@#$%^&*()|+=÷¿?;: ,<>\{\}\[\]\\\/]/g, '-'))
        .pipe(dest('assets/css/images'))
}

exports.sass = series(compileSass); 
exports.image = series(f_imagemin);

exports.default = function () { 
    watch('assets/sass/**/*', series(compileSass));
};


