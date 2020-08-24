const projectName = require('./project');

const payDev = require('./proConfig/demo/dev');
const payProd = require('./proConfig/demo/prod');

const config = {
  demo: {
    development: payDev,
    production: payProd
  }
};

const configObj = config[projectName.name];

module.exports = configObj;