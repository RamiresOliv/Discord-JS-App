const { logTime } = require("../../../modules/logSystem.js");

exports.loadFunction = (client, configs, adicional) => {
  // adicional[0] = queue
  adicional[0].textChannel.send(":wave: A música acabou, até ;)");

  try {
    if (configs.distubeConf.leaveOnFinish) {
      return adicional[0].voice.leave();
    }
  } catch (err) {
    return "a. F";
  }
};
