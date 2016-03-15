'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checkConfig = require('../checkConfig');

var _checkConfig2 = _interopRequireDefault(_checkConfig);

var _uncoveredPaths = require('../uncoveredPaths');

var _uncoveredPaths2 = _interopRequireDefault(_uncoveredPaths);

var _messageFormatter2 = require('../messageFormatter');

var _messageFormatter3 = _interopRequireDefault(_messageFormatter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = configValidator;


function configValidator(config, validators) {
  var uncoveredFields = getWarningsForUncoveredFields(config, validators);
  var results = (0, _checkConfig2.default)(config, validators);
  var totalResults = uncoveredFields.concat(results);
  if (totalResults.length) {
    var _messageFormatter = (0, _messageFormatter3.default)(totalResults);

    var error = _messageFormatter.error;
    var warning = _messageFormatter.warning;

    log(error);
    log(warning);
  }

  return {
    warnings: uncoveredFields.length,
    errors: results.length,
    config: config
  };
}

function getWarningsForUncoveredFields(config, validators) {
  return (0, _uncoveredPaths2.default)(config, validators).map(function (uncoveredPath) {
    return {
      key: uncoveredPath,
      message: 'Unknown key',
      type: 'warning'
    };
  });
}

function log(message) {
  if (message) {
    console.log(message); // eslint-disable-line no-console
  }
}