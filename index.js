/* jslint node: true */
'use strict';

const path = require('path');
const util = require('util');
const fs = require('fs');
const async = require('async');

function isDirSync(aPath) {
    try {
        return fs.statSync(aPath)
            .isDirectory();
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
    }
}

class AppTasks {
    constructor(preFolder, postFolder, debug) {
        this.preFolder = preFolder;
        this.postFolder = postFolder;
        this.debug = debug;

        if (isDirSync(path.join(__dirname, preFolder))) {
            this.preModules = require('include-all')({
                dirname: path.join(__dirname, preFolder)
            });
        }

        if (isDirSync(path.join(__dirname, postFolder))) {
            this.postModules = require('include-all')({
                dirname: path.join(__dirname, postFolder)
            });
        }

        this.preFuncs = [];
        this.postFuncs = [];
    }

    isDirSync(path) {
        try {
            return fs.statSync(path)
                .isDirectory();
        } catch (err) {
            if (err.code === 'ENOENT') {
                return false;
            }
        }
    }

    start() {
        var intern;

        if (this.debug) {
            console.log('\nAll pre start modules: ', util.inspect(
                this.preModules, {
                    showHidden: false,
                    depth: null
                }));
        }

        for (var i in this.preModules) {
            if (i) {
                this.preFuncs.push(this.preModules[i]);
            }

            if (this.debug) {
                console.log('\nRunning start(): ', i);
            }
        }

        async.series(this.preFuncs, function (err, result) {
            if (err) {
                return Promise.reject(err);
            }
            intern = Promise.resolve(result);
        });

        return Promise.resolve(intern);
    } // start

    // -------------------------------------------------------------------------
    end() {
        var intern;

        if (this.debug) {
            console.log('\nAll post start modules: ', util.inspect(
                this.postModules, {
                    showHidden: false,
                    depth: null
                }));
        }

        for (var i in this.postModules) {
            if (i) {
                this.postFuncs.push(this.postModules[i]);
            }
            if (this.debug) {
                console.log('\nRunning end(): ', i);
            }
        }

        async.series(this.postFuncs, function (err, result) {
            if (err) {
                return Promise.reject(err);
            }
            intern = Promise.resolve(result);
        });

        return Promise.resolve(intern);
    } // end
}

module.exports = AppTasks;
