'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var originalConsole = void 0; /* eslint no-console:0 */


(0, _ava2.default)('no log with no error or messages', function (t) {
  setup();
  (0, _2.default)('Webpack Config', {}, []);
  t.false(console.log.called);
  cleanUp();
});

(0, _ava2.default)('logs error messages', function (t) {
  setup();
  var config = { bar: 'baz' };
  var validators = [{ key: 'bar', validate: function validate() {
      return 'error';
    } }];
  (0, _2.default)('Webpack Config', config, validators);
  t.true(console.log.calledOnce);
  t.true(console.log.calledWithMatch(/Webpack Config[\s\S]*?bar[\s\S]*?error/));
  cleanUp();
});

(0, _ava2.default)('unknown fields', function (t) {
  setup();
  var config = { bar: 'baz', cat: 'bag' };
  var validators = [{ key: 'bar', validate: function validate() {
      return 'error';
    } }];
  (0, _2.default)('Webpack Config', config, validators);
  t.true(console.log.calledWithMatch(/Webpack Config[\s\S]*?bar[\s\S]*?error/));
  cleanUp();
});

(0, _ava2.default)('nested fields should not trigger', function (t) {
  setup();
  var config = {
    foo: {
      bar: true,
      baz: 23
    }
  };
  var validators = [{ key: 'foo.bar', validate: function validate() {}
  }, { key: 'foo.baz', validate: function validate() {}
  }];
  (0, _2.default)('Webpack Config', config, validators);
  t.false(console.log.called);
  cleanUp();
});

(0, _ava2.default)('null fields should not trigger', function (t) {
  setup();
  var config = {
    foo: null,
    help: 'me'
  };
  var validators = [{ key: 'foo', validate: function validate() {}
  }, { key: 'help', validate: function validate() {}
  }];
  (0, _2.default)('Webpack Config', config, validators);
  t.false(console.log.called);
  cleanUp();
});

(0, _ava2.default)('arrays fields should not have nested checks', function (t) {
  setup();
  var config = {
    foo: null,
    help: ['me', 'you', 'them']
  };
  var validators = [{ key: 'foo', validate: function validate() {}
  }, { key: 'help', validate: function validate() {}
  }];
  (0, _2.default)('Webpack Config', config, validators);
  t.false(console.log.called);
  cleanUp();
});

(0, _ava2.default)('nested fields can trigger though when not validated', function (t) {
  setup();
  var config = {
    foo: {
      bar: true,
      baz: 23
    }
  };
  var validators = [{ key: 'foo.bar', validate: function validate() {}
  }];
  (0, _2.default)('Webpack Config', config, validators);
  t.true(console.log.calledOnce);
  cleanUp();
});

(0, _ava2.default)('nesteder fields can trigger though when not validated', function (t) {
  setup();
  var config = {
    foo: {
      bar: {
        cat: 'sink'
      },
      baz: 23
    }
  };
  var validators = [{ key: 'foo.bar.cat', validate: function validate() {
      return 'error';
    } }];
  (0, _2.default)('Webpack Config', config, validators);
  t.true(console.log.calledTwice);
  cleanUp();
});

(0, _ava2.default)('logs warning messages', function (t) {
  setup();
  var config = { bar: 'baz' };
  var validators = [{ key: 'bar', validate: function validate() {
      return { warning: 'warning' };
    } }];
  (0, _2.default)('Webpack Config', config, validators);
  t.true(console.log.calledOnce);
  t.true(console.log.calledWithMatch(/Webpack Config[\s\S]*?bar[\s\S]*?warning/));
  cleanUp();
});

function setup() {
  originalConsole = console.log;
  console.log = _sinon2.default.spy();
}

function cleanUp() {
  console.log = originalConsole;
}