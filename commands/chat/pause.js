const { PermissionFlagsBits } = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.guild.members.me.permissions.has(PermissionFlagsBits.Connect)) {
    return message.reply(
      ":question::x: Desculpe eu não sou autorizado para entrar em canais de voz! :("
    );
  }
  if (!message.member.permissions.has(PermissionFlagsBits.Connect)) {
    return message.reply(
      ":question::x: Desculpe mas você não pode entrar em canais de voz! :("
    );
  }

  try {
    const queue = client.distube.getQueue(message);

    const channel = message.member.voice.channel;
    if (queue && channel.id != queue.voiceChannel.id) {
      return message.reply(
        ":x: Você não pode pausar a música sem estár no mesmo canal que a música está tocando."
      );
    }

    if (!queue) {
      return message.reply(":question::x: Não estou tocando nada para pausar.");
    }
    if (!queue.paused) {
      queue.pause();
      message.reply(":pause_button: A música agora foi pausada.");
    } else {
      message.reply(":pause_button: A música já está pausada.");
    }
  } catch (error) {
    message.reply(":question::x: Não foi possivel pausar a música!");
    console.log("pause error?:", error);
  }
};

exports.config = {
  name: "pause",
  usage: "pause",
  aliases: ["pausar", "calma", "pera", "segura"],
  description: "Pause qualquer música tocando",

  InVoiceChannel: true,
};
