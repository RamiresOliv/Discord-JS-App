const { PermissionFlagsBits, AttachmentBuilder } = require("discord.js");

exports.run = async (client, message, args) => {
  const msg = args.join(" ");
  if (
    !message.guild.members.me
      .permissionsIn(message.channel)
      .has(PermissionFlagsBits.ManageMessages)
  ) {
    return message.reply(
      ":question::x: Desculpe mas eu não consigo deletar mensagems nesse canal! :( `MANAGE_MESSAGES`"
    );
  }
  if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
    return message.reply(
      ":question::x: Desculpe mas você não pode usar esse comando! :( `MANAGE_MESSAGES`"
    );
  }
  if (msg == "" && message.attachments.first() == null) {
    return message.reply(
      ":question::x: Esse comando precisa de uma mensagem! :( `MESSAGE_EMPTY`"
    );
  }
  var attach = [];
  message.attachments.forEach((attac) => {
    const file = new AttachmentBuilder(attac.proxyURL, attac.name);
    attach.push(file);
  });
  message.delete();

  if (message.attachments.first() != null && msg == "") {
    message.channel.send({
      files: attach,
    });
  } else {
    message.channel.send({
      content: msg,
      files: attach,
    });
  }
};

exports.config = {
  name: "say",
  usage: "say [msg] (attachment)",
  aliases: ["falar"],
  description: "Faz o bot falar qual quer coisa.",

  InVoiceChannel: false,
  DeprecatedWarning: false,
};
