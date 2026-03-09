const { PermissionFlagsBits } = require("discord.js");
const { getPrefix } = require("../../modules/serverPrefix.js");

exports.run = async (client, message, args) => {
  const prefix = await getPrefix(message);
  if (!message.member.permissions.has(PermissionFlagsBits.Connect)) {
    return message.reply(
      "Desculpe mas, você não consegue usar esse comando! `CONNECT`"
    );
  }
  const tips = [
    {
      content:
        "Quando for usar o comando `" +
        prefix +
        "play` você pode colocar por exemplo `EVVORTEX - FATAL` em vez de apenas o nome do video que seria `FATAL`, então use desse jeito: `[AUTOR DA música] - [NOME DA música]`, desse jeito facilita muito para o bot achar, EX:",
      files: ["./images/TIP_PlayCommand.png"],
    },
  ];

  const selectedTip = tips[Math.floor(Math.random() * tips.length)];
  message.reply(selectedTip);
};

exports.config = {
  name: "tip",
  usage: "tip",
  aliases: ["dica"],
  description: "Mostra uma dica boa para você *[temp removed]*",

  InDev: true,
  InVoiceChannel: false,
};
