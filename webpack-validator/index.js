'use strict';

var _validators = require('./validators');

var _validators2 = _interopRequireDefault(_validators);

var _lodash = require('lodash');

var _configurationValidator = require('../../configuration-validator');

var _configurationValidator2 = _interopRequireDefault(_configurationValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// mixing CommonJS in here to make it easier to consume in CommonJS & ES6
module.exports = webpackValidator;
module.exports.validators = _validators2.default;

function webpackValidator(config) {
  for (var _len = arguments.length, otherValidators = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    otherValidators[_key - 1] = arguments[_key];
  }

  var instanceValidators = (0, _lodash.flatten)([].concat(_toConsumableArray(_validators2.default), otherValidators));
  return (0, _configurationValidator2.default)(config, instanceValidators);
}