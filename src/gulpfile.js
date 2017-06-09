var browserify = require("browserify");
var path = require("path");
var fs = require("fs");
var mcss = require('./scripts/gulp-mcss.js');
var gulp = require("gulp");
var buffer = require('vinyl-buffer');
var regularify = require("regularify");
var html2string = require("browserify-html2string");
var source = require("vinyl-source-stream");
var jshint = require("gulp-jshint");
var rm = require("gulp-rimraf");
var sequence = require('run-sequence');
var shell = require("gulp-shell");

var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var release = require('gulp-release-tasks');



gulp.task('browserify', function(done){
    browserify(['./app/client/js/entry.js'], {debug: true})
    .transform(html2string)
    .transform(regularify({
        END: '}',
        BEGIN: '{',
        rgl: [],
        rglc: ['xhtml']
    }))
    .bundle()
    .on('error', function(err){
        console.log('!!!!!!!!!!!!' + err)
        done(null);
    })
    .pipe(source('entry.js'))
     /*压缩代码*/
    /*.pipe(buffer())
        .pipe(uglify())*/
    .pipe(gulp.dest('public/entry/js'))
    done()
});



gulp.task('clean', function(done) {
    var files = fs.readdirSync('./app/client/assets').map(function(p) {
        return 'public/entry' + p
    });
    return gulp.src(files, {read:false}).pipe(rm());
})


gulp.task('copy',  function() {
    return gulp.src(['./app/client/assets/**'], {
        base: './app/client/assets'
    }).
    pipe(gulp.dest('./public/entry/'));
})

gulp.task('mcss', function(done) {
    gulp.src('./app/client/mcss/index.mcss')
        .pipe(mcss({
            pathes: ['./node_modules'],
            importCSS: true
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/entry/css'));
    done();
});

gulp.task('client', function(done){
  sequence('clean', ['browserify', 'mcss','copy'], done);
});

gulp.task('puer-release', shell.task([
    'puer -d ./public -p 4444'
]));
gulp.task('puer-dev', shell.task([
    'puer -a main.js -p 4444'
]));

gulp.task('server', shell.task([
    'node ./app/server/app.js'
]));

gulp.task('page',function(done){
    sequence('clean',['copy','mcss'],done);
});

gulp.task('watch', function(){
  gulp.watch(['app/client/js/**'],['browserify']);
  gulp.watch(['app/client/mcss/**'],['mcss']);
  gulp.watch(['app/client/assets/**'],['copy']);
 // gulp.watch(['app/server/views/**'],['ejs2html']);
});

// 静态页面开发任务
gulp.task('pageDev',['page','watch']);


// gulp.task('default', ['client','puer-release','watch']);
gulp.task('default', ['client','puer-dev','watch']);
