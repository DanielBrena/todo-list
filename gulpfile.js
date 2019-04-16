var gulp = require('gulp');

var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var filter = require('gulp-filter');
var flatten = require('gulp-flatten');

var paths = {
  styles:'assets/css/**/*.css',
  indexPath: 'views/layouts',
  dependencies: 'assets/js/dependencies',
  index: 'views/layouts/layout.ejs',
  app: 'assets/js/app/**/*.js',
  appCore: 'assets/js/app/core/**/*.js',
  appModules: 'assets/js/app/**/*.module.js',
  appProvider: 'assets/js/app/**/*.provider.js',
  appController: 'assets/js/app/**/*.controller.js',
  appFactory: 'assets/js/app/**/*.factory.js',
  appFilter:'assets/js/app/**/*.filter.js',
  appDirective: 'assets/js/app/**/*.directive.js',
  bower: 'bower_components'

}
gulp.task('default', ['scripts', 'watch'], function () {
  console.log('init');
});
gulp.task('scripts', function () {
  var scripts = gulp.src(paths.app);
  var css = gulp.src(paths.styles);

  var glob = [paths.bower+'/jquery/dist/jquery.js'].concat(mainBowerFiles(['**/*.js','**/*.css', '!/path/to/jquery.js']));
  glob = glob.concat([paths.bower+'/angular-i18n/angular-locale_es-mx.js'])
  
  var index = gulp.src(paths.index).pipe(gulp.dest(paths.indexPath));
  var dependencies = gulp.src(glob).pipe(gulp.dest(paths.dependencies));
  var fonts = gulp.src(paths.bower+'/lumx/dist/fonts/materialdesignicons-webfont.*').pipe(gulp.dest(paths.dependencies+'/fonts'));
  
  var modules = gulp.src(paths.appModules);
  var controller = gulp.src(paths.appController);
  var factory = gulp.src(paths.appFactory);
  var filter = gulp.src(paths.appFilter);
  var directive = gulp.src(paths.appDirective);
  var provider = gulp.src(paths.appProvider);



  index.pipe(inject(dependencies, {
      relative: false,
      ignorePath: 'assets',
      name: 'dependenciesInject'
    })).pipe(inject(modules, {
      relative: false,
      ignorePath: 'assets',
      name: 'modulesInject'
    }))
    .pipe(inject(provider, {
      relative: false,
      ignorePath: 'assets',
      name: 'providerInject'
    }))
    .pipe(inject(controller, {
      relative: false,
      ignorePath: 'assets',
      name: 'controllerInject'
    }))
    .pipe(inject(factory, {
      relative: false,
      ignorePath: 'assets',
      name: 'factoryInject'
    }))
    .pipe(inject(filter, {
      relative: false,
      ignorePath: 'assets',
      name: 'filterInject'
    }))
    .pipe(inject(directive, {
      relative: false,
      ignorePath: 'assets',
      name: 'directiveInject'
    }))
    .pipe(inject(css, {
      relative: false,
      ignorePath: 'assets'
    })) 
    .pipe(gulp.dest(paths.indexPath));
});


gulp.task('watch', function () {
  gulp.watch(paths.bower, ['scripts']);
  gulp.watch(paths.app, ['scripts']);
  gulp.watch(paths.styles, ['scripts'])
})
