const { PermissionFlagsBits } = require("discord.js");
const { filters } = require("../../configs/config.json");
const { getPrefix } = require("../../modules/serverPrefix.js");

exports.run = async (client, message, args) => {
  const prefix = await getPrefix(message);

  if (!message.member.permissions.has(PermissionFlagsBits.Connect)) {
    return message.reply(
      ":question::x: Desculpe mas você não consegue entrar em canais de voz! :( `CONNECT`"
    );
  }

  if (!args[0]) {
    return message.reply(
      ":question::x: Porfavor forneça um filtro antes de executar exemplo: `" +
        prefix +
        "filter [filtro]`"
    );
  }

  const queue = client.distube.getQueue(message);

  const channel = message.member.voice.channel;
  if (queue && channel.id != queue.voiceChannel.id) {
    return message.reply(
      ":x: Você não pode usar um filtro sem estár no mesmo canal que a música está tocando."
    );
  }

  if (!queue) {
    return message.reply(":question::x: Não estou tocando nada para filtrar.");
  }

  if (args[0].toLowerCase() == "clear") {
    queue.filters.clear();
    return message.reply(":broom: Os filtros foram limpados/removidos.");
  } else if (args[0].toLowerCase() == "remove") {
    if (!args[1]) {
      return message.reply(
        ":question::x: Porfavor forneça um filtro para remover antes de executar exemplo: `" +
          prefix +
          "filter remove [filtro]`"
      );
    }
    queue.filters.remove(args[1].toLowerCase());
    return message.reply(":broom: Os filtros foram limpados/removidos.");
  }

  try {
    queue.filters.add(filters[args[0]]);
    message.reply(
      ":control_knobs: Agora as músicas estão sendo filtradas com o filtro `" +
        args.join(" ") +
        "`. Caso queira removelo use `" +
        prefix +
        "filter clear`"
    );
  } catch (err) {
    message.reply(":question::x: Porfavor mencione um filtro valido.");
  }
};

exports.config = {
  name: "filter",
  usage: "filter [NOME DO FILTRO]",
  aliases: ["filtro", "filtrar"],
  description: "Bora de bassboost? 😈",

  InVoiceChannel: true,
};
