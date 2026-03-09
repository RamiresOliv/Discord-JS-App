const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

exports.run = async (client, interaction) => {
  if (!interaction.member.permissions.has(PermissionFlagsBits.Connect)) {
    return interaction.reply({
      content:
        ":question::x: Desculpe mas você não pode entrar em canais de voz! :(",
      ephemeral: true,
    });
  }

  const queue = client.distube.getQueue(interaction);
  if (!queue) {
    return interaction.reply({
      content: ":question::x: Não estou tocando nada para parar.",
      ephemeral: true,
    });
  }

  const channel = interaction.member.voice.channel;
  if (queue && channel.id != queue.voiceChannel.id) {
    return interaction.reply({
      content:
        ":x: Você não pode usar esse comando. Pois já estou tocando alguma coisa em outro canal!",
      ephemeral: true,
    });
  }

  try {
    queue.stop();
    interaction.reply(":wave: Até mais!");
  } catch (error) {
    console.log("stop error?:", error);
    return interaction.reply({
      content: ":question::x: Hm, Não foi possivel me desconectar!",
      ephemeral: true,
    });
  }
};

exports.config = new SlashCommandBuilder()
  .setName("stop")
  .setDescription(
    "Para qualquer música tocando, se o usuário estiver no mesmo canal de voz."
  );

exports.others = {
  InVoiceChannel: true,
};
