const { Permissions, SlashCommandBuilder } = require("discord.js");
const request = require("request");

exports.run = async (client, message, args) => {
  const msg = await message.reply("Procurando... _(a melhor)_");
  const interval = setInterval(() => {
    request(
      "https://api.thecatapi.com/v1/images/search",
      { json: true },
      (err, res, body) => {
        if (err || res.statusCode != 200) {
          msg.edit(
            "ah... Putz, desculpa mas não foi possivel achar uma foto de um gatinho por agora. Tente mais tarde. _(o erro aparente, foi reportado.)_"
          );
          clearInterval(interval);
          return "invalid Img";
        }

        if (!body[0].url.endsWith(".false")) {
          clearInterval(interval);
          msg.edit(body[0].url);
        }
      }
    );
  }, 1000);
};

exports.config = {
  name: "cat",
  usage: "cat",
  description: "Fotos de gatinhos. <3",

  InVoiceChannel: false,
};
