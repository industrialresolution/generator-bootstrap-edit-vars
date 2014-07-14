'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var BootstrapEditVarsGenerator = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the BootstrapEditVars generator!'));

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
                checked: true
            }]
        }];

        this.prompt(prompts, function (answers) {
            var features = answers.features;
            if(features.indexOf('jsBootstrap') !== -1){
                this.jsBootstrap = true;
            }
            else{
                this.jsBootstrap = false;
            }

            if(features.indexOf('fontawesome') !== -1){
                this.fontawesome = true;
            }
            else{
                this.fontawesome = false;
            }

            done();
        }.bind(this));

    },

    mainStyleSheet: function () {
        var contents = '@import "bootstrap.less";\n@icon-font-path: "../fonts/glyphicons/";\n\n';

        if (this.fontawesome) {
            contents = contents + '@import "../bower_components/font-awesome/less/font-awesome.less";\n@fa-font-path: "../fonts/font-awesome";\n\n';
        }

        contents = contents + '.browsehappy {\n  margin: 0.2em 0; \n  background: #ccc; \n  color: #000; \n  padding: 0.2em 0; \n}\n\n';
        contents = contents + '.jumbotron {\n  margin: 50px auto 0 auto;\n}';
        this.write('app/styles/main.less', contents);
    },

    configuring: function () {
        this.dest.mkdir('app');
        this.dest.mkdir('app/scripts');
        this.dest.mkdir('app/styles');
        this.dest.mkdir('app/images');
        this.dest.write('app/scripts/main.coffee', 'console.log "\'Allo from CoffeeScript!"');
    },

    writing: function () {
        this.copy('gitignore', '.gitignore');
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
        this.copy('bowerrc', '.bowerrc');
        this.template('_bower.json', 'bower.json');
        this.copy('favicon.ico', 'app/favicon.ico');
        this.copy('404.html', 'app/404.html');
        this.copy('robots.txt', 'app/robots.txt');
        this.copy('htaccess', 'app/.htaccess');
        this.copy('variables.less', 'app/styles/variables.less');
        this.copy('bootstrap.less', 'app/styles/bootstrap.less');
        //Ideally we'd copy this from bootstrap3 after it's installed, but there doesn't seem to be a good mechanism for that right now.
        this.template('Gruntfile.js');
        this.template('_package.json', 'package.json');
        this.template('index.html', 'app/index.html');
    },

    install: function() {

        if (this.options['skip-install']) {
            return;
        }

        var done = this.async();
        this.installDependencies({
            skipMessage: this.options['skip-install-message'],
            skipInstall: this.options['skip-install'],
            callback: done
        });
    }

});

module.exports = BootstrapEditVarsGenerator;