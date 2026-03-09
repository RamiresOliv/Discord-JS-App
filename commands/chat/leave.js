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
  if (!botMember.voice.channel) {
    return message.reply(
      ":question::x: Eu estou em nenhum canal. Talvez você possa usar um `" +
        prefix +
        "join`?"
    );
  }

  if (channel.id != botMember.voice.channel.id) {
    return message.reply(
      ":question::x: Você precisa estár no mesmo canal de voz que eu estou para me fazer sair."
    );
  }

  try {
    await client.distube.voices.leave(message);
    message.reply(":wave: Tchau, Tchau!");
  } catch (err) {
    console.log(err);
    return message.reply(
      ":question::x: Eu não consigo sair nesse canal por algum motivo... Desculpe :("
    );
  }
};

exports.config = {
  name: "leave",
  usage: "leave",
  aliases: ["sair", "desconectar", "sai"],
  description:
    "Faz o bot sair do canal de voz, se o usuário estiver no mesmo canal.",

  InDev: false,
  InVoiceChannel: true,
};
