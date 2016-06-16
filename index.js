/* jslint node: true */
'use strict';

var util = require('util');
var fs = require('fs');
var series = require('run-series');
var requireDirectory = require('require-directory');

function isDirSync(aPath) {
    try {
        return fs.statSync(aPath).isDirectory();
    } catch (e) {
        if (e.code === 'ENOENT') {
            return false;
        }
    }
}

function AppTasks(options) {
    var self = this;

    self.preFolder = options && options.preFolder || 'pre';
    self.postFolder = options && options.postFolder || 'post';
    if (isDirSync(self.preFolder) && isDirSync(self.postFolder)) {
        self.preModules = requireDirectory(module, self.preFolder);
        self.postModules = requireDirectory(module, self.postFolder);
        self.preFuncs = [];
        self.postFuncs = [];
        self.DEBUG = options.DEBUG || false;
        if (self.DEBUG) {
            console.log('----------------------------------');
            console.log('AppTasks initializing...');
            console.log('AppTasks config: ', options);
            console.log('----------------------------------\n');
        }

        self.start = function start(cb) {
            if (self.DEBUG) {
                console.log('All pre start modules: ', util.inspect(self.preModules, {
                    showHidden: false,
                    depth: null
                }));
            }

            for (var i in self.preModules) {
                if (self.preModules.hasOwnProperty(i)) {
                    self.preFuncs.push(self.preModules[i]);
                    if (self.DEBUG) {
                        console.log('Running: ', i);
                    }
                }
            }
            series(self.preFuncs, function processPre(err, results) {
                var state = {
                    error: null,
                    results: null
                };

                if (err) {
                    state.error = new Error(err);
                } else {
                    state.results = results;
                }

                cb(state);
            });
        };

        // -------------------------------------------------------------------------
        self.end = function end(cb) {
            if (self.DEBUG) {
                console.log('\nAll pre start modules: ', util.inspect(self.postModules, {
                    showHidden: false,
                    depth: null
                }));
            }

            for (var i in self.postModules) {
                if (self.postModules.hasOwnProperty(i)) {
                    self.postFuncs.push(self.postModules[i]);
                    if (self.DEBUG) {
                        console.log('Running: ', i);
                    }
                }
            }
            series(self.postFuncs, function processPost(err, results) {
                var state = {
                    error: null,
                    results: null
                };

                if (err) {
                    state.error = new Error(err);
                } else {
                    state.results = results;
                }

                cb(state);
            });
        };
    } else {
        console.log('Missing or incompelte settings');
    }
}

module.exports = AppTasks;
