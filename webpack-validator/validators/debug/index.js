'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

exports.default = {
  key: 'debug',
  validate: validateDebug
};


function validateDebug(val) {
  if (!(0, _lodash.isBoolean)(val)) {
    return 'no boolean value provided';
  }
}