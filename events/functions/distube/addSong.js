const { logTime } = require("../../../modules/logSystem.js");

exports.loadFunction = (client, configs, adicional) => {
  // adicional[0] = queue, adicional[1] = song
  //console.log(adicional)
  adicional[0].textChannel.send(
    `:heavy_plus_sign::headphones: Foi adicionado \`${adicional[1].name}\` - \`${adicional[1].formattedDuration}\` na fila.`
  );
};
