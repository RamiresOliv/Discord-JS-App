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
      return message.reply(":question::x: Não estou tocando nada para pular.");
    }

    const channel = message.member.voice.channel;
    if (queue && channel.id != queue.voiceChannel.id) {
      return message.reply(
        ":x: Você não pode dar next sem estár no mesmo canal que está a música."
      );
    }

    const next_song = await queue.skip();
    message.reply(
      ":track_next: música pulada para a proxima, que é `" +
        next_song.name +
        "`."
    );
  } catch (error) {
    message.reply(":question::x: Hm, Não foi possivel pular a música!");
    console.log("skip error?:", error);
  }
};

exports.config = {
  name: "skip",
  usage: "skip",
  aliases: ["pular", "skipar", "next", "sk"],
  description: "Pula a música atual para a proxima.",

  InVoiceChannel: true,
};
