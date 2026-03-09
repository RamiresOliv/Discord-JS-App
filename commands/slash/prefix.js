const { default_prefix } = require("../../configs/config.json");
const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");
const database = require("local-db-express");
const { getPrefix } = require("../../modules/serverPrefix.js");

const db_collection = "servers";

exports.run = async (client, interaction) => {
  const newPrefix = interaction.options.getString("prefix");
  
  if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
    return interaction.reply(
      ":x: Esse comando é apenas para Administradores. `ADMINISTRATOR`"
    );
  }

  if (!newPrefix) {
    return interaction.reply({
      content: ":x: Porfavor forneça algum parametro para ser adicionado como prefix EX: `/prefix [meu incrivel novo prefix OU default]`",
      ephemeral: true,
    });
  }

  const get_prefix_now = await database.document.get(
    db_collection,
    interaction.guild.id
  ).document;
  if (newPrefix == get_prefix_now) {
    return interaction.reply({
      content: ":x: Esse prefixo já está sendo usado nesse servidor!",
      ephemeral: true,
    });
  }

  if (
    newPrefix.toLowerCase() == "default" ||
    newPrefix.toLowerCase() == "remove" ||
    newPrefix.toLowerCase() == "remover" ||
    newPrefix.toLowerCase() == "tirar" ||
    newPrefix.toLowerCase() == "padrão" ||
    newPrefix.toLowerCase() == "padrao" ||
    newPrefix.toLowerCase() == default_prefix
  ) {
    const doc_exists = await database.document.exists(
      db_collection,
      interaction.guild.id
    );
    if (!doc_exists) {
      return interaction.reply({
        content: "O Prefixo já está padrão nesse servidor!",
        ephemeral: true,
      });
    }
    await database.document.delete(db_collection, interaction.guild.id);
    return interaction.reply(
      ":new: O Prefixo atual do servidor agora é `" +
        default_prefix +
        "`. Se caso você esqueca o prefixo atual você pode me mencionar como <@" +
        client.user.id +
        ">"
    );
  } else if (newPrefix.toLowerCase() == "atual") {
    const getted = await database.document.get(db_collection, interaction.guild.id);
    return interaction.reply(
      "O Prefixo atual do servidor é `" + getted.document + "`."
    );
  }

  if (newPrefix.length > 5) {
    return interaction.reply({
      content: ":x: Infelizmente esse prefix é maior que o limite permitido de caracteres! Que é `4`! Né? É o prefix então tem que ser pequeno..",
      ephemeral: true,
    });
  }

  try {
    await database.document.delete(db_collection, interaction.guild.id);
    await database.document.add(
      db_collection,
      interaction.guild.id,
      newPrefix
    );
    const getted = await database.document.get(db_collection, interaction.guild.id);
    interaction.reply(
      ":new: Agora o prefixo desse servidor é `" +
        getted.document +
        "`. Se caso você esqueça o prefixo atual você pode me mencionar como <@" +
        client.user.id +
        ">"
    );
  } catch (err) {
    interaction.reply(":x::x: Algo deu errado...");
    console.log("prefix def error?:", err);
    interaction.followUp(err);
  }
};

exports.config = new SlashCommandBuilder()
	.setName('prefix')
	.setDescription("Seta o prefixo do bot para o servidor atual.")
  .addStringOption(option =>
		option.setName('prefix')
		  .setMaxLength(4)
  	 	.setDescription('Put here the *new* prefix. Max of 4 characters')
			 .setRequired(true)
  )

exports.others = {
  InVoiceChannel: false,
}