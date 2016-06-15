import test from 'ava';
import AppTasks from './';

const taskRunner = new AppTasks({
    preFolder: 'fixtures/pre',
    postFolder: 'fixtures/post'
});

taskRunner.start(function (state) {
    if (state.results) {
        global.startResult = state.results[0];
    }
});

taskRunner.end(function (state) {
    if (state.results) {
        global.endResult = state.results[0];
    }
});

test.serial('AppTasks module', t => {
    t.truthy(AppTasks, 'AppTasks loaded');
});

test.serial('AppTasks start() present', t => {
    t.is(typeof taskRunner.start, 'function', 'start() is present');
});

test.serial('AppTasks end() present', t => {
    t.is(typeof taskRunner.end, 'function', 'end() is present');
});

test.serial('AppTasks start() test', t => {
    t.is(global.startResult, 'Start result 1', 'Pre task carried out');
});

test('AppTasks end() test', t => {
    t.is(global.endResult, 'End result 1', 'Post task carried out');
});
