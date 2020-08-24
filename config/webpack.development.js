
const projectConfig = require('./projectConfig');

const { development} = projectConfig;

const devConfig = {config: { ...development}};

module.exports = devConfig;