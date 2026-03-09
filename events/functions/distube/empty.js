const { distubeConf } = require("../../../configs/config.json");

exports.loadFunction = (client, configs, adicional) => {
  // adicional[0] = queue, adicional[1] = song
  adicional[0].textChannel.send(
    ":wave: O canal estava vazio! Tenho que ir, tchau! `" +
      toString(distubeConf.emptyCooldown) +
      "s`"
  );
};
