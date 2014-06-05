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
        var html = '@import "bootstrap.less";\n@icon-font-path: "../fonts/glyphicons/";\n\n';

        if (this.fontawesome) {
            html = html + '@import "../bower_components/font-awesome/less/font-awesome.less";\n@fa-font-path: "../fonts/font-awesome";\n\n';
        }

        html = html + '.browsehappy {\n  margin: 0.2em 0; \n  background: #ccc; \n  color: #000; \n  padding: 0.2em 0; \n}\n\n';
        html = html + '.jumbotron {\n  margin: 50px auto 0 auto;\n}';
        this.write('app/styles/main.less', html);
    },

    bootstrapStylesheet: function () {
        var html = '@path:"../bower_components/bootstrap/less/";\n\n// Core variables and mixins\n@import "variables.less";\n@import "@{path}mixins.less";\n\n// Reset\n@import "@{path}normalize.less";\n@import "@{path}print.less";\n\n// Core CSS\n@import "@{path}scaffolding.less";\n@import "@{path}type.less";\n@import "@{path}code.less";\n@import "@{path}grid.less";\n@import "@{path}tables.less";\n@import "@{path}forms.less";\n@import "@{path}buttons.less";\n\n// Components\n@import "@{path}component-animations.less";\n@import "@{path}glyphicons.less";\n@import "@{path}dropdowns.less";\n@import "@{path}button-groups.less";\n@import "@{path}input-groups.less";\n@import "@{path}navs.less";\n@import "@{path}navbar.less";\n@import "@{path}breadcrumbs.less";\n@import "@{path}pagination.less";\n@import "@{path}pager.less";\n@import "@{path}labels.less";\n@import "@{path}badges.less";\n@import "@{path}jumbotron.less";\n@import "@{path}thumbnails.less";\n@import "@{path}alerts.less";\n@import "@{path}progress-bars.less";\n@import "@{path}media.less";\n@import "@{path}list-group.less";\n@import "@{path}panels.less";\n@import "@{path}wells.less";\n@import "@{path}close.less";\n\n// Components w/ JavaScript\n@import "@{path}modals.less";\n@import "@{path}tooltip.less";\n@import "@{path}popovers.less";\n@import "@{path}carousel.less";\n\n// Utility classes\n@import "@{path}utilities.less";\n@import "@{path}responsive-utilities.less";';

        this.write('app/styles/bootstrap.less', html);
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