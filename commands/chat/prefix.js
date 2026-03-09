const { default_prefix } = require("../../configs/config.json");
const { PermissionFlagsBits } = require("discord.js");
const database = require("local-db-express");
const { getPrefix } = require("../../modules/serverPrefix.js");

const db_collection = "servers";

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
    return message.reply(
      ":x: Esse comando é apenas para Administradores. `ADMINISTRATOR`"
    );
  }

  const current_prefix = await getPrefix(message);
  if (!args[0]) {
    return message.reply(
      ":x: Porfavor forneça algum parametro para ser adicionado como prefix EX: `" +
        current_prefix +
        "prefix [meu incrivel novo prefix OU default]`"
    );
  }

  const get_prefix_now = await database.document.get(
    db_collection,
    message.guild.id
  ).document;
  if (args[0] == get_prefix_now) {
    return message.reply(
      ":x: Esse prefixo já está sendo usado nesse servidor!"
    );
  }

  if (
    args[0].toLowerCase() == "default" ||
    args[0].toLowerCase() == "remove" ||
    args[0].toLowerCase() == "remover" ||
    args[0].toLowerCase() == "tirar" ||
    args[0].toLowerCase() == "padrão" ||
    args[0].toLowerCase() == "padrao" ||
    args[0].toLowerCase() == default_prefix
  ) {
    const doc_exists = await database.document.exists(
      db_collection,
      message.guild.id
    );
    if (!doc_exists) {
      return message.reply("O Prefixo já está padrão nesse servidor!");
    }
    await database.document.delete(db_collection, message.guild.id);
    return message.reply(
      ":new: O Prefixo atual do servidor agora é `" +
        default_prefix +
        "`. Se caso você esqueca o prefixo atual você pode me mencionar como <@" +
        client.user.id +
        ">"
    );
  } else if (args[0].toLowerCase() == "atual") {
    const getted = await database.document.get(db_collection, message.guild.id);
    return message.reply(
      "O Prefixo atual do servidor é `" + getted.document + "`."
    );
  }

  if (args.join(" ").length > 5) {
    return message.reply(
      ":x: Infelizmente esse prefix é maior que o limite permitido de caracteres! Que é `4`! Né? É o prefix então tem que ser pequeno.."
    );
  }

  try {
    await database.document.delete(db_collection, message.guild.id);
    await database.document.add(
      db_collection,
      message.guild.id,
      args.join(" ")
    );
    const getted = await database.document.get(db_collection, message.guild.id);
    message.reply(
      ":new: Agora o prefixo desse servidor é `" +
        getted.document +
        "`. Se caso você esqueça o prefixo atual você pode me mencionar como <@" +
        client.user.id +
        ">"
    );
  } catch (err) {
    message.reply(":x::x: Algo deu errado...");
    console.log("prefix def error?:", err);
    message.reply(err);
  }
};

exports.config = {
  name: "prefix",
  usage: "prefix",
  description: "Seta o prefixo do bot para o servidor atual.",

  InVoiceChannel: false,
};
