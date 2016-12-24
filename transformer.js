'use strict';

const babel = require('babel-core');

/**
 * This is your `.babelrc` equivalent.
 */
const babelRC = {
  presets: [require('babel-preset-react-native')],
  plugins: [
    // The following plugin will rewrite imports. Reimplementations of node
    // libraries such as `assert`, `buffer`, etc. will be picked up
    // automatically by the React Native packager.  All other built-in node
    // libraries get rewritten to their browserify counterpart.
    [require('babel-plugin-rewrite-require'), {
      aliases: {
        https: 'https-browserify'
      },
      throwForNonStringLiteral: true,
    }],
  ],
};

function transform(src, filename, options) {
  const babelConfig = Object.assign({}, babelRC, {
    filename,
    sourceFileName: filename,
  });
  const result = babel.transform(src, babelConfig);
  return {
    ast: result.ast,
    code: result.code,
    map: result.map,
    filename: filename,
  };
}

module.exports = function(data, callback) {
  let result;
  try {
    result = transform(data.sourceCode, data.filename, data.options);
  } catch (e) {
    callback(e);
    return;
  }
  callback(null, result);
};
