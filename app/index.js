'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var BootstrapLessGenerator = module.exports = function BootstrapLessGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // setup the test-framework property, Gruntfile template will need this
  this.testFramework = options['test-framework'] || 'mocha';

  // for hooks to resolve on mocha by default
  if (!options['test-framework']) {
    options['test-framework'] = 'mocha';
  }
  // resolved to mocha by default (could be switched to jasmine for instance)
  this.hookFor('test-framework', { as: 'app' });

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.mainJsFile = '';

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BootstrapLessGenerator, yeoman.generators.Base);

BootstrapLessGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  console.log(this.yeoman);

  var prompts = [{
    type: 'checkbox',
    name: 'features',
    message: 'What more would you like?',
    choices: [{
      name: 'Bootstrap Javascript files',
      value: 'jsBootstrap',
      checked: true
    }, {
      name: 'FontAwesome',
      value: 'fontawesome',
      checked: false
    }]
  }];

  this.prompt(prompts, function (answers) {
    var features = answers.features;
    this.jsBootstrap = features.indexOf('jsBootstrap') !== -1;
    this.fontawesome = features.indexOf('fontawesome') !== -1;

    cb();
  }.bind(this));
};

BootstrapLessGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

BootstrapLessGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

BootstrapLessGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
};

BootstrapLessGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

BootstrapLessGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

BootstrapLessGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

BootstrapLessGenerator.prototype.h5bp = function h5bp() {
  this.copy('favicon.ico', 'app/favicon.ico');
  this.copy('404.html', 'app/404.html');
  this.copy('robots.txt', 'app/robots.txt');
  this.copy('htaccess', 'app/.htaccess');
};

BootstrapLessGenerator.prototype.variablesLess = function variablesLess() {
  this.copy('variables.less', 'app/styles/variables.less');
  //Ideally we'd copy this from bootstrap3 after it's installed, but there doesn't seem to be a good mechanism for that right now.
};

BootstrapLessGenerator.prototype.mainStylesheet = function mainStylesheet() {
  var html = '@import "bootstrap.less";\n@icon-font-path: "../fonts/glyphicons/";\n\n';

  if (this.fontawesome) {
    html = html + '@import "../bower_components/font-awesome/less/font-awesome.less";\n@fa-font-path: "../fonts/font-awesome";\n\n';
  }

  html = html + '.browsehappy {\n  margin: 0.2em 0; \n  background: #ccc; \n  color: #000; \n  padding: 0.2em 0; \n}\n\n';
  html = html + '.jumbotron {\n  margin: 50px auto 0 auto;\n}';
  this.write('app/styles/main.less', html);
};

BootstrapLessGenerator.prototype.bootstrapStylesheet = function bootstrapStylesheet() {
  var html = '@path:"../bower_components/bootstrap/less/";\n\n// Core variables and mixins\n@import "variables.less";\n@import "@{path}mixins.less";\n\n// Reset\n@import "@{path}normalize.less";\n@import "@{path}print.less";\n\n// Core CSS\n@import "@{path}scaffolding.less";\n@import "@{path}type.less";\n@import "@{path}code.less";\n@import "@{path}grid.less";\n@import "@{path}tables.less";\n@import "@{path}forms.less";\n@import "@{path}buttons.less";\n\n// Components\n@import "@{path}component-animations.less";\n@import "@{path}glyphicons.less";\n@import "@{path}dropdowns.less";\n@import "@{path}button-groups.less";\n@import "@{path}input-groups.less";\n@import "@{path}navs.less";\n@import "@{path}navbar.less";\n@import "@{path}breadcrumbs.less";\n@import "@{path}pagination.less";\n@import "@{path}pager.less";\n@import "@{path}labels.less";\n@import "@{path}badges.less";\n@import "@{path}jumbotron.less";\n@import "@{path}thumbnails.less";\n@import "@{path}alerts.less";\n@import "@{path}progress-bars.less";\n@import "@{path}media.less";\n@import "@{path}list-group.less";\n@import "@{path}panels.less";\n@import "@{path}wells.less";\n@import "@{path}close.less";\n\n// Components w/ JavaScript\n@import "@{path}modals.less";\n@import "@{path}tooltip.less";\n@import "@{path}popovers.less";\n@import "@{path}carousel.less";\n\n// Utility classes\n@import "@{path}utilities.less";\n@import "@{path}responsive-utilities.less";';
  
  this.write('app/styles/bootstrap.less', html);
};

BootstrapLessGenerator.prototype.writeIndex = function writeIndex() {
  // prepare default content text
  var defaults = ['HTML5 Boilerplate', 'Bootstrap'];
  var contentText = [
    '    <div class="container">',
    '      <div class="jumbotron">',
    '        <h1>\'Allo, \'Allo!</h1>',
    '        <p>You now have</p>',
    '        <ul>'
  ];

  this.indexFile = this.appendScripts(this.indexFile, 'scripts/main.js', [
    'bower_components/jquery/jquery.js',
    'scripts/main.js',
    'scripts/hello.js'
  ]);


  if (this.jsBootstrap) {
    // wire Bootstrap plugins
    this.indexFile = this.appendScripts(this.indexFile, 'scripts/vendor/bootstrap.js', [
      'bower_components/bootstrap/js/affix.js',
      'bower_components/bootstrap/js/alert.js',
      'bower_components/bootstrap/js/dropdown.js',
      'bower_components/bootstrap/js/tooltip.js',
      'bower_components/bootstrap/js/modal.js',
      'bower_components/bootstrap/js/transition.js',
      'bower_components/bootstrap/js/button.js',
      'bower_components/bootstrap/js/popover.js',
      'bower_components/bootstrap/js/carousel.js',
      'bower_components/bootstrap/js/scrollspy.js',
      'bower_components/bootstrap/js/collapse.js',
      'bower_components/bootstrap/js/tab.js'
    ]);
  }

  if (this.fontawesome) {
    defaults.push('Font Awesome <i class="fa fa-flag"></i>');
  }

  this.mainJsFile = 'console.log(\'\\\'Allo \\\'Allo!\');';
  this.mainCoffeeFile = 'console.log "\'Allo from CoffeeScript!"';

  // iterate over defaults and create content string
  defaults.forEach(function (el) {
    contentText.push('          <li>' + el  + '</li>');
  });

  contentText = contentText.concat([
    '        </ul>',
    '        <p>installed.</p>',
    '        <h3>Enjoy coding! - Yeoman</h3>',
    '      </div>',
    '    </div>',
    ''
  ]);

  // append the default content
  this.indexFile = this.indexFile.replace('<body>', '<body>\n' + contentText.join('\n'));
};

BootstrapLessGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/scripts');
  this.mkdir('app/styles');
  this.mkdir('app/images');
  this.write('app/index.html', this.indexFile);
  this.write('app/scripts/hello.coffee', this.mainCoffeeFile);
  this.write('app/scripts/main.js', this.mainJsFile);
};
