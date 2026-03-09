const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

exports.run = async (client, interaction) => {
  if (
    !interaction.guild.members.me.permissions.has(PermissionFlagsBits.Connect)
  ) {
    return interaction.reply(
      ":question::x: Desculpe eu não sou autorizado para entrar em canais de voz! :("
    );
  }
  if (!interaction.member.permissions.has(PermissionFlagsBits.Connect)) {
    return interaction.reply(
      ":question::x: Desculpe mas você não pode entrar em canais de voz! :("
    );
  }

  try {
    const queue = client.distube.getQueue(interaction.channel);
    if (!queue) {
      return interaction.reply(
        ":question::x: Não estou tocando nada para pausar."
      );
    }

    const channel = interaction.member.voice.channel;
    if (queue && channel.id != queue.voiceChannel.id) {
      return interaction.reply({
        content:
          ":x: Você não pode usar esse comando. Pois já estou tocando alguma coisa em outro canal!",
        ephemeral: true,
      });
    }

    if (!queue.paused) {
      queue.pause();
      interaction.reply(":pause_button: A música agora foi pausada.");
    } else {
      interaction.reply(":pause_button: A música já está pausada.");
    }
  } catch (error) {
    interaction.reply(":question::x: Não foi possivel pausar a música!");
    console.log("pause error?:", error);
  }
};

exports.config = new SlashCommandBuilder()
  .setName("pause")
  .setDescription("Pause qualquer música tocando.");

exports.others = {
  InVoiceChannel: true,
};
