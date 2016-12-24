const oldRequire = global.require
console.log(321);
console.log(oldRequire);
global.require = function (moduleId) {
  console.log(moduleId);
  return oldRequire(moduleId)
}
console.log(require);
