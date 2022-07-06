import camelCase from 'lodash/camelCase';

const requiredModule = require.context('.', false, /\.js$/);
const modules = {};
requiredModule.keys().forEach((filename) => {
  if (filename === './index.js') {
    return;
  }

  const moduleConfig = requiredModule(filename);
  const moduleName = camelCase(filename.replace(/(\.\/|\.js)/g, ''));
  modules[moduleName] = moduleConfig.default || moduleConfig;
});

export default modules;
