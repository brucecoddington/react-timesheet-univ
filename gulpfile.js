var
  _ =           require('lodash'),
  gulp =        require('gulp'),
  pkg =         require('./package.json'),
  changed =     require('gulp-changed'),
  concat =      require('gulp-concat'),
  filesize =    require('gulp-filesize'),
  gulpif =      require('gulp-if'),
  jade =        require('gulp-jade'),
  jshint =      require('gulp-jshint'),
  less =        require('gulp-less'),
  livereload =  require('gulp-livereload'),
  cssmin =      require('gulp-minify-css'),
  nodemon =     require('gulp-nodemon'),
  notify =      require('gulp-notify'),
  plumber =     require('gulp-plumber'),
  rename =      require('gulp-rename'),
  shell =       require('gulp-shell'),
  sourcemaps =  require('gulp-sourcemaps'),
  uglify =      require('gulp-uglify'),
  gutil =       require('gulp-util'),
  watch =       require('gulp-watch'),
  webpack =     require('gulp-webpack'),
  buffer =      require('vinyl-buffer'),
  source =      require('vinyl-source-stream'),
  del =         require('del'),
  path =        require('path'),
  merge =       require('merge-stream'),
  createVars =  require('./config/create.variables'),
  karma =       require('karma').server;

// main tasks
gulp.task('core', ['webpack', 'concat:css', 'copy:assets']);
gulp.task('dev',  ['core', 'jade:dev']);
gulp.task('prod', ['core', 'jade:prod', 'uglify']);
gulp.task('init', ['build:css']);

// server tasks
gulp.task('serve:dev', function () {
  nodemon({
    script: './app/server.js',
    env: {'NODE_ENV': 'development'}
  });
});

gulp.task('serve:prod', function () {
  nodemon({
    script: './app/server.js',
    env: {'NODE_ENV': 'production'}
  });
});

gulp.task('debug', shell.task([pkg.scripts.debug]));

// setup the global watches
gulp.task('watch:dev', function () {
  gulp.watch(['./assets/less/**/*.scss', './app/**/*.less'], ['concat:css']);
  gulp.watch(['./semantic/src/**/*'], ['build:css']);
  gulp.watch(['./app/index.jade'], ['jade:dev']);
  gulp.start('dev');
});

gulp.task('watch:prod', function () {
  gulp.watch(['./assets/less/**/*.less', './app/**/*.less'], ['concat:css']);
  gulp.watch(['./dist/assets/js/app.js'], ['uglify']);
  gulp.watch(['./semantic/src/**/*'], ['build:css']);
  gulp.watch(['./app/index.jade'], ['jade:prod']);
  gulp.start('prod');
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done);
});

// Build index.html
gulp.task('clean:index', function (cb) {
  return del(['./dist/index.html'], cb);
});

gulp.task('jade:dev', ['clean:index'], function () {
  return gulp.src('./app/index.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true,
      data: {
        env: 'development'
      }
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});

gulp.task('jade:prod', ['clean:index'], function () {
  return gulp.src('./app/index.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true,
      data: {
        env: 'production',
        debug: false
      }
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});

// clean and copy assets
gulp.task('clean:assets', function (cb) {
  return del([
    './dist/assets/font',
    './dist/assets/img'], cb);
});

gulp.task('copy:assets', ['clean:assets'], function () {
  var fa = gulp.src('./node_modules/font-awesome/fonts/**')
    .pipe(gulp.dest('./dist/assets/font/font-awesome'));

  var img = gulp.src('./assets/img/**')
    .pipe(gulp.dest('./dist/assets/img'));

  return merge(fa, img);
});

// Compile and concatenate scss into css
gulp.task('clean:css', function (cb) {
  return del(['./dist/assets/css'], cb);
});

gulp.task('less', ['clean:css'], function () {
  return gulp.src(client('/less/style.less'))
    .pipe(plumber())
    .pipe(less({paths: [client('/less')]}))
    .pipe(gulp.dest(dist('/css')))
    .on('error', gutil.log.bind(gutil, 'Error compiling Less'));
});


// Compile and concatenate less into css
gulp.task('concat:css', ['less'], function () {
  return gulp.src([
      './node_modules/nprogress/nprogress.css',
      './semantic/dist/semantic.css',
      dist('/css/style.css')
    ])
    .pipe(concat('style.css'))
    .pipe(gulp.dest(dist('/css')))
    .pipe(cssmin())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(dist('/css')))
    .pipe(livereload())
    .on('error', gutil.log.bind(gutil, 'Error concatenating CSS'));
});

gulp.task('build:css', ['semantic:build', 'less'], function () {
  return gulp.start('concat:css');
});

gulp.task("webpack", function() {
  return gulp.src('./app/client.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('uglify', ['webpack'], function () {
  return gulp.src('./dist/assets/js/app.js')
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(livereload())
    .on('error', gutil.log.bind(gutil, 'Error during minification.'));
});

gulp.task('semantic:build', require('./semantic/tasks/build'));
gulp.task('semantic:watch', require('./semantic/tasks/watch'));