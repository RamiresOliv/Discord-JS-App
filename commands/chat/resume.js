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
    if (!queue) {
      return message.reply(
        ":question::x: Não estou tocando nada para resumir."
      );
    }
    const channel = message.member.voice.channel;
    if (queue && channel.id != queue.voiceChannel.id) {
      return message.reply(
        ":x: Você não pode resumir a música sem estár no mesmo canal que está a música."
      );
    }
    if (queue.paused) {
      queue.resume();
      message.reply(":arrow_forward: A música agora foi despausada.");
    } else {
      message.reply(":arrow_forward: A música já está despausada.");
    }
  } catch (error) {
    message.reply(
      ":question::x: Não foi possivel resumir a música talvez seja porque não esteja tocando nada."
    );
    console.log("resume error?:", err);
  }
};

exports.config = {
  name: "resume",
  usage: "resume",
  aliases: ["resumir", "despause", "vai", "continue", "continuar"],
  description: "resume qualquer música pausada.",

  InVoiceChannel: true,
};
