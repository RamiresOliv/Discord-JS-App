const { PermissionFlagsBits } = require("discord.js");
const { getPrefix } = require("../../modules/serverPrefix.js");
const db = require("local-db-express");

exports.run = async (client, message, args) => {
  const prefix = await getPrefix(message);

  if (args[0] == null) {
    return message.reply(
      ":question::x: Porfavor coloque um URL ou um titulo de um video para continuar...\nJeito de uso: `" +
        prefix +
        "play [url]`"
    );
  }

  const getted_queue = client.distube.getQueue(message);

  if (!message.guild.members.me.permissions.has(PermissionFlagsBits.Connect)) {
    return message.reply(
      ":question::x: Desculpe eu não sou autorizado para entrar em canais de voz! :("
    );
  }

  const channel = message.member.voice.channel;
  if (getted_queue && channel.id != getted_queue.voiceChannel.id) {
    return message.reply(
      ":question::x: Parece que já estou em uso no servidor! Que tal um `" +
        prefix +
        "stop` antes."
    );
  }

  try {
    const url = args.join(" ").replace("intl-pt/", "");
    await client.distube.play(channel, url, {
      textChannel: message.channel,
      member: message.member,
    });
    return await db.document.update("client", "AddedSongs", (oldValue) => {
      return (oldValue += 1);
    });
  } catch (err) {
    console.log(err);
    return message.reply(
      ":question::x: Desculpe mais procurei até em baixo da minha cama... Mas não achei essa música. Talvez isso sejá um problema comigo. Tente enviar o link do video/música"
    );
  }
};

exports.config = {
  name: "play",
  usage: "play [url/title]",
  aliases: ["add", "tocar", "p"],
  description:
    "Toca qualquer audio de videos disponiveis no YouTube/Spotify(_link_). Que sejá menor que uma hora.",

  InVoiceChannel: true,
};
