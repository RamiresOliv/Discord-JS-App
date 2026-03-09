const {
  Permissions,
  SlashCommandBuilder,
  AttachmentBuilder,
} = require("discord.js");
const request = require("request");

exports.run = async (client, interaction) => {
  await interaction.deferReply({
    ephemeral: false,
  });
  const interval = setInterval(() => {
    request(
      "https://api.thecatapi.com/v1/images/search",
      { json: true },
      (err, res, body) => {
        if (err || res.statusCode != 200) {
          interaction.editReply(
            "Ah... putz, desculpa mas não foi possivel achar uma foto de um gatinho por agora. Tente mais tarde. _(o erro aparente, foi reportado.)_"
          );
          clearInterval(interval);
          return "invalid Img";
        }

        if (!body[0].url.endsWith(".false")) {
          clearInterval(interval);

          const attachment = new AttachmentBuilder(body[0].url, {
            name: `ulr.${body[0].url.split().pop()}`,
          });
          interaction.editReply({
            files: [attachment],
          });
        }
      }
    );
  }, 1000);
};

exports.config = new SlashCommandBuilder()
  .setName("cat")
  .setDescription("Fotos de gatinhos. <3");

exports.others = {
  InVoiceChannel: false,
};
