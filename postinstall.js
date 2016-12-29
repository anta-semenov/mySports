var fs = require('fs')
var path = require('path')

const helperPath = path.resolve('./node_modules/react-native/packager/react-packager/src/Resolver/polyfills/babelHelpers.js')

const babelHelper = fs.readFileSync(helperPath, {encoding: 'utf8'})

if (!(/babelHelpers.typeof = typeof Symbol/g.test(babelHelper))) {
  fs.writeFileSync(
    helperPath,
    babelHelper.replace(
      'var babelHelpers = global.babelHelpers = {};',
      'var babelHelpers = global.babelHelpers = {};\n\n' +
      'babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {\n' +
      '  return typeof obj;\n' +
      '} : function (obj) {\n' +
      '  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;\n' +
      '};'
    )
  )
}
