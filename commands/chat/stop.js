const { PermissionFlagsBits } = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has(PermissionFlagsBits.Connect)) {
    return message.reply(
      ":question::x: Desculpe mas você não pode entrar em canais de voz! :("
    );
  }

  try {
    const queue = client.distube.getQueue(message);
    if (!queue) {
      return message.reply(":question::x: Não estou tocando nada para parar.");
    }
    const channel = message.member.voice.channel;
    if (queue && channel.id != queue.voiceChannel.id) {
      return message.reply(
        ":x: Você não pode parar a música sem estár no mesmo canal que está a música."
      );
    }
    queue.stop();
    message.reply(":wave: Até mais!");
  } catch (error) {
    message.reply(":question::x: Hm, Não foi possivel me desconectar!");
    console.log("stop error?:", error);
  }
};

exports.config = {
  name: "stop",
  usage: "stop",
  aliases: ["parar", "pare", "para", "end", "finish", "terminar"],
  description:
    "Para qualquer música tocando, se o usuário estiver no mesmo canal de voz.",

  InVoiceChannel: true,
};
