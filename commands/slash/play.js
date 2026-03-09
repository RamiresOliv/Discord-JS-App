const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");
const { getPrefix } = require("../../modules/serverPrefix.js");
const db = require("local-db-express");

exports.run = async (client, interaction) => {
  const typed = interaction.options.getString("música");
  const safeSearch = interaction.options.getBoolean("safeSearch");
  const prefix = await getPrefix(interaction);

  if (typed == null) {
    return interaction.reply({
      content:
        ":question::x: Porfavor coloque um URL ou um titulo de um video para continuar...\nJeito de uso: </play:" +
        client.SlashCommandData["play"].id +
        "> `[url]`",
      ephemeral: true,
    });
  }
  const getted_queue = client.distube.getQueue(interaction.channel);
  const channel = interaction.member.voice.channel;

  if (
    getted_queue &&
    getted_queue.voiceChannel &&
    channel &&
    channel.id != getted_queue.voiceChannel.id
  ) {
    return interaction.reply({
      content:
        ":x: Parece que já estou em uso no servidor! Que tal um </stop:" +
        client.SlashCommandData["stop"].id +
        "> antes.",
      ephemeral: true,
    });
  }

  if (
    !interaction.guild.members.me.permissions.has(PermissionFlagsBits.Connect)
  ) {
    return interaction.reply({
      content:
        ":question::x: Desculpe eu não sou autorizado para entrar em canais de voz! :(",
      ephemeral: true,
    });
  }
  await interaction.deferReply({
    ephemeral: true,
  });

  try {
    //https://open.spotify.com/intl-pt/track/4qDLOaWu6zSmYq38Pg0zss?si=4791c6a3b7514618
    const url = typed.replace("intl-pt/", "");
    await client.distube.play(channel, url, {
      textChannel: interaction.channel,
      member: interaction.member,
      safeSearch: safeSearch || false,
    });
    await interaction.editReply({
      content: "prontinho!",
      ephemeral: true,
    });
    return await db.document.update("client", "AddedSongs", (oldValue) => {
      return (oldValue += 1);
    });
  } catch (err) {
    console.log(err);
    return await interaction.editReply({
      content:
        ":question::x: Desculpe mais procurei até em baixo da minha cama... Mas não achei essa música. Talvez isso sejá um problema comigo. Tente enviar o link do video/música",
      ephemeral: true,
    });
  }
};

exports.config = new SlashCommandBuilder()
  .setName("play")
  .setDescription(
    "Toca qualquer audio de videos disponiveis no YouTube/Spotify(_link_). Que sejá menor que uma hora."
  )
  .addStringOption((option) =>
    option
      .setName("música")
      .setDescription(
        "Coloque aqui o nome da musica/link seja playlist ou video do Youtube ou Spotify."
      )
      .setRequired(true)
  )
  .addBooleanOption((option) =>
    option
      .setName("safesearch")
      .setDescription("Deseja que o SafeSearch do YouTube esteja ativado?")
  );

exports.others = {
  InVoiceChannel: true,
};
