const { PermissionFlagsBits } = require("discord.js");
const { getPrefix } = require("../../modules/serverPrefix.js");

exports.run = async (client, message, args) => {
  const prefix = await getPrefix(message);

  if (!message.guild.members.me.permissions.has(PermissionFlagsBits.CONNECT)) {
    return message.reply(
      ":question::x: Desculpe eu não sou autorizado para entrar em canais de voz! :("
    );
  }
  if (!message.member.permissions.has(PermissionFlagsBits.Connect)) {
    return message.reply(
      ":question::x: Desculpe mas você não pode entrar em canais de voz! :("
    );
  }

  const queue = client.distube.getQueue(message);
  if (queue) {
    return message.reply(
      ":question::x: Parece que já estou em uso no servidor! Que tal um `" +
        prefix +
        "stop` antes."
    );
  }
  const channel = message.member.voice.channel;
  if (!channel) {
    return message.reply(
      ":x: Você precisa estár em um canal de voz primeiro!!"
    );
  }

  const botMember = message.guild.members.cache.get(client.user.id);
  if (botMember.voice.channel && botMember.voice.channel.id == channel.id) {
    return message.reply(
      ":question::x: Eu... Já estou nesse canal.... Talvez você possa usar um `" +
        prefix +
        "leave`?"
    );
  }

  try {
    await client.distube.voices.join(channel);
    message.reply(":wave: Olá!");
  } catch (err) {
    console.log(err);
    return message.reply(
      ":question::x: Eu não consigo entrar nesse canal por algum motivo... Desculpe :("
    );
  }
};

exports.config = {
  name: "join",
  usage: "join",
  aliases: ["entrar", "conectar"],
  description: "Faz o bot entrar no canal de voz, se o usuário estiver em uma.",

  InDev: false,
  InVoiceChannel: true,
};
