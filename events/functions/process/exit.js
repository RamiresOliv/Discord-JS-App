const { logTime } = require("../../../modules/logSystem.js");

exports.loadFunction = (client, configs, adicional) => {
  // adicional[0] = errorCode
  console.log(`${logTime("/Shutdown")}: Exited code '${adicional}'`);
};
