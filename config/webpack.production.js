
const projectConfig = require('./projectConfig');

const {production} = projectConfig;

const prodConfig = { config: { ...production}};

module.exports = prodConfig;
