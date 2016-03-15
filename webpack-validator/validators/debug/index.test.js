'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validate = _2.default.validate;


(0, _ava2.default)('passes with a boolean value', function (t) {
  var debug = false;
  t.notOk(validate(debug));
});

(0, _ava2.default)('fails with a non boolean value', function (t) {
  var debug = 'someValue';
  t.ok(validate(debug));
});