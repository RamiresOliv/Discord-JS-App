const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

exports.run = async (client, interaction) => {
  const numberStringed = interaction.options.getString("até");
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
        content: ":question::x: Não estou tocando nada para pular.",
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

    if (numberStringed) {
      let tonumber = parseInt(numberStringed);
      if (isNaN(tonumber)) {
        return interaction.reply({
          content:
            ":question::x: Esse opção precisa de um numero valido! ex: `3`. :( `JUMP_TO_EMPTY/JUMP_TO_INVALID`",
          ephemeral: true,
        });
      } else if (tonumber < 2 || tonumber > 1000) {
        return interaction.reply({
          content:
            ":question::x: Ta de brincadeira né? `" +
            numberStringed +
            "`???? :expressionless: O minimo que você pode pular usando essa opção é `2`. E o máximo `1000`",
          ephemeral: true,
        });
      }

      const next_song = await queue.jump(tonumber);
      interaction.reply(
        ":track_next::asterisk: Super-Jump! Foi pulado " +
          numberStringed +
          " músicas, agora está tocando: `" +
          next_song.name +
          "`."
      );
    } else {
      const next_song = await queue.skip();
      interaction.reply(
        ":track_next: música pulada para a proxima, que é `" +
          next_song.name +
          "`."
      );
    }
  } catch (error) {
    console.log("skip error?:", error);
    return interaction.reply({
      content: ":question::x: Hm, Não foi possivel pular a música!",
      ephemeral: true,
    });
  }
};

exports.config = new SlashCommandBuilder()
  .setName("skip")
  .setDescription("Pula a música atual para a proxima.")
  .addStringOption((option) =>
    option
      .setName("até")
      .setMaxLength(4)
      .setDescription(
        "Defina aqui quantas músicas eu devo pular em relação a que está tocando agora."
      )
  );

exports.others = {
  InVoiceChannel: true,
};
