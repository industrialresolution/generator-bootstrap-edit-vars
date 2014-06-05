/*global describe, beforeEach, it*/
'use strict';
var assert = require('assert');
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('bootstrap-edit-vars generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('bootstrap-edit-vars:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            // add files you expect to exist here.
            '.jshintrc',
            '.editorconfig',
            '.bowerrc',
            'bower.json',
            'package.json',
            'app/favicon.ico',
            '.gitignore',
            'Gruntfile.js',
            'app/.htaccess',
            'app/index.html',
            'app/robots.txt',
            'app/404.html',
            'app/scripts/main.coffee',
            'app/styles/bootstrap.less',
            'app/styles/main.less',
            'app/styles/variables.less'
        ];

        helpers.mockPrompt(this.app, {
            'features': [
                'fontawesome',
                'jsBootstrap'
            ]
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFile(expected);
            done();
        });
    });
});

describe('bootstrap-edit-vars generator', function () {
    it('can be imported without blowing up', function () {
        var app = require('../app');
        assert(app !== undefined);
    });
});