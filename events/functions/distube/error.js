const { logTime } = require("../../../modules/logSystem.js");

exports.loadFunction = (client, configs, adicional) => {
  // adicional[0] = queue, adicional[1] = song
  let string =
    "Um erro foi achado: " +
    adicional[1] +
    "\nPorfavor caso queira reportalo para não acontecer denovo fale com `" +
    client.owner +
    "`";

  if (string.length > 2000) {
    string =
      "Um erro foi achado: " +
      toString(adicional[1].join()).slice(0, 1000) +
      "\nPorfavor caso queira reportalo para não acontecer denovo fale com `" +
      client.owner +
      "`";
  }
  console.log(adicional[1]);
  console.log(string);
  adicional[0].textChannel.send(string);
};
