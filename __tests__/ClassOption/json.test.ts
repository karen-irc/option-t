/* eslint-disable no-prototype-builtins */

import test from 'ava';

import { createSome, createNone } from '../../__dist/cjs/Option';

import {
    primitiveVal,
    objectVal,
    nonSerializableObjectVal,
    funcVal,
    symbolVal,
    undefinedVal,
} from '../utils';

primitiveVal.forEach(function (value) {
    const type = typeof value;
    const label = 'Some<T>: type: ' + type + ', value: `' + String(value) + '`';

    test(label, function (t) {
        t.plan(4);

        const raw = createSome(value);
        const result = JSON.parse(JSON.stringify(raw));

        ['is_some', 'value'].forEach(function (key) {
            t.is(result.hasOwnProperty(key), true, 'json has `' + key + '` field.');
        });

        t.is(result.is_some, true, '`is_some` should be expected');
        t.is(result.value, value, '`value` should be expected');
    });
});

objectVal.forEach(function (value) {
    const type = typeof value;
    const label = 'Some<T>: type: ' + type + ', value: `' + String(value) + '`';

    test(label, function (t) {
        t.plan(4);

        const raw = createSome(value);
        const result = JSON.parse(JSON.stringify(raw));

        ['is_some', 'value'].forEach(function (key) {
            t.is(result.hasOwnProperty(key), true, 'json has `' + key + '` field.');
        });

        t.is(result.is_some, true);
        // Compare each members because `object` will be an another object
        // after serialize & deserialize.
        t.deepEqual(result.value, value);
    });
});

nonSerializableObjectVal.forEach(function (value) {
    const type = typeof value;
    const label = 'Some<T>: type: ' + type + ', value: `' + String(value) + '`';

    test(label, function (t) {
        t.plan(4);

        const raw = createSome(value);
        const result = JSON.parse(JSON.stringify(raw));

        ['is_some', 'value'].forEach(function (key) {
            t.is(result.hasOwnProperty(key), true, 'json has `' + key + '` field.');
        });

        t.is(result.is_some, true);

        // Some objects cannot be serialized to json by default.
        t.is(typeof result.value, 'object');
    });
});

funcVal.forEach(function (value) {
    const type = typeof value;
    const label = 'Some<T>: type: ' + type + ', value: `' + String(value) + '`';

    test(label, function (t) {
        t.plan(3);

        const raw = createSome(value);
        const result = JSON.parse(JSON.stringify(raw));

        ['is_some'].forEach(function (key) {
            t.is(result.hasOwnProperty(key), true, 'json has `' + key + '` field.');
        });

        t.is(result.is_some, true);

        // `function` is not serialized to json.
        t.is(result.value, undefined);
    });
});

symbolVal.forEach(function (value) {
    const type = typeof value;
    const label = 'Some<T>: type: ' + type + ', value: `' + String(value) + '`';

    test(label, function (t) {
        t.plan(3);

        const raw = createSome(value);
        const result = JSON.parse(JSON.stringify(raw));

        ['is_some'].forEach(function (key) {
            t.is(result.hasOwnProperty(key), true, 'json has `' + key + '` field.');
        });

        t.is(result.is_some, true);
        // `symbol` is not serialized to json.
        t.is(result.value, undefined);
    });
});

undefinedVal.forEach(function (value) {
    const type = typeof value;
    const label = 'Some<T>: type: ' + type + ', value: `' + String(value) + '`';

    test(label, function (t) {
        t.plan(3);

        const raw = createSome(value);
        const result = JSON.parse(JSON.stringify(raw));

        ['is_some'].forEach(function (key) {
            t.is(result.hasOwnProperty(key), true, 'json has `' + key + '` field.');
        });

        t.is(result.is_some, true, '`is_some` should be expected');
        t.is(result.value, undefined, '`value` should be expected');
    });
});

test('None', function (t) {
    t.plan(3);

    const raw = createNone();
    const result = JSON.parse(JSON.stringify(raw));

    ['is_some'].forEach(function (key) {
        t.is(result.hasOwnProperty(key), true, 'json has `' + key + '` field.');
    });

    t.is(result.is_some, false, '`is_some` should be expected');
    t.is(result.value, undefined, '`value` should be expected');
});
