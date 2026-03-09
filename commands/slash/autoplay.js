const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

const possibleStates = { ["1"]: true, ["2"]: false, ["3"]: "status" };

exports.run = async (client, interaction) => {
  const type = possibleStates[interaction.options.getString("type")];
  const queue = client.distube.getQueue(interaction.channel);
  if (!interaction.member.permissions.has(PermissionFlagsBits.Connect)) {
    return interaction.reply({
      content:
        ":question::x: Desculpe mas você não pode entrar em canais de voz! :(",
      ephemeral: true,
    });
  }

  if (!queue) {
    return interaction.reply({
      content:
        ":question::x: Não foi possivel executar esse comando pois nenhuma música está tocando agora.",
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

  if (queue.autoplay == type) {
    interaction.reply(
      `:arrow_right::question: Autoplay já esta ${
        queue.autoplay ? "ativado!" : "desativado!"
      }`
    );
  } else if (type == "status") {
    if (queue.autoplay) {
      interaction.reply(":arrow_right: Autoplay está ativado.");
    } else {
      interaction.reply(`:arrow_right: Autoplay está desativado.`);
    }
  } else {
    try {
      const res = queue.toggleAutoplay(type);
      if (res == true) {
        interaction.reply(
          `:arrow_right: Agora o Autoplay está ativado, músicas aleatorias serão adicionadas a fila. Use </stop:${client.SlashCommandData["stop"].id}> para parar a fila. Ou desligue o autoplay usando </autoplay:${client.SlashCommandData["autoplay"].id}> ` +
            "`off`."
        );
      } else {
        interaction.reply(
          `:arrow_right: Agora o Autoplay está desativado, Use </autoplay:${client.SlashCommandData["autoplay"].id}> ` +
            "`on`" +
            ` para ativar o autoplay novamente.` +
            "`off`."
        );
      }
    } catch (error) {
      console.log("toggleAutoplay error?:", error);
      return interaction.reply({
        content:
          ":question::x: Não foi possivel ativar o Autoplay... Sim, isso é um erro inesperado.. 😗",
        ephemeral: true,
      });
    }
  }
};

exports.config = new SlashCommandBuilder()
  .setName("autoplay")
  .setDescription("Adiciona automaticamente músicas a sua queue.")
  .addStringOption((option) =>
    option
      .setName("type")
      .setDescription("Que modo você quer o Autoplay?")
      .setRequired(true)
      .addChoices(
        { name: "on", value: "1" },
        { name: "off", value: "2" },
        { name: "status", value: "3" }
      )
  );

exports.others = {
  InVoiceChannel: true,
};
