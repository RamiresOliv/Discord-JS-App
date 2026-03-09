const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

exports.run = async (client, interaction) => {
  if (
    !interaction.guild.members.me.permissions.has(PermissionFlagsBits.Connect)
  ) {
    return interaction.reply({
      content:
        ":question::x: Desculpe eu não sou autorizado para entrar em canais de voz! :(",
      ephemeral: true,
    });
  }
  if (!interaction.member.permissions.has(PermissionFlagsBits.Connect)) {
    return interaction.reply({
      content:
        ":question::x: Desculpe mas você não pode entrar em canais de voz! :(",
      ephemeral: true,
    });
  }
  try {
    const queue = client.distube.getQueue(interaction.channel);
    if (!queue) {
      return interaction.reply({
        content: ":question::x: Não estou tocando nada para resumir.",
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

    if (queue.paused) {
      queue.resume();
      interaction.reply(":arrow_forward: A música agora foi despausada.");
    } else {
      return interaction.reply({
        content: ":arrow_forward: A música já está despausada.",
        ephemeral: true,
      });
    }
  } catch (error) {
    console.log("resume error?:", err);
    return interaction.reply({
      content:
        ":question::x: Não foi possivel resumir a música talvez seja porque não esteja tocando nada.",
      ephemeral: true,
    });
  }
};

exports.config = new SlashCommandBuilder()
  .setName("resume")
  .setDescription("Resume qualquer música pausada.");

exports.others = {
  InVoiceChannel: true,
};
