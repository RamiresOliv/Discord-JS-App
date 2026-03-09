const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

const loopTypes = {
  none: 0,
  music: 1,
  queue: 2,
};

exports.run = async (client, interaction) => {
  const type = interaction.options.getString("type").toLowerCase();
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

  if (type == "status") {
    if (queue.repeatMode == 1) {
      interaction.reply(":repeat_one: loop está ativado apenás nessa música!");
    } else if (queue.repeatMode == 2) {
      interaction.reply(":repeat_one: loop está ativado em toda fila!");
    } else {
      interaction.reply(`:repeat_one: loop está desativado!`);
    }
  } else {
    try {
      const selectedType = loopTypes[(type || "none").toLowerCase()];

      if (selectedType == 1) {
        interaction.reply(
          `:repeat_one: Agora apenas essa música está em loop! Use </stop:${client.SlashCommandData["stop"].id}> para parar a música ou </loop:${client.SlashCommandData["loop"].id}> no tipo \`queue\` para dar loop na fila inteira.`
        );
      } else if (selectedType == 2) {
        interaction.reply(
          `:repeat: Agora a fila inteira está em loop! Use </stop:${client.SlashCommandData["stop"].id}> para parar a música ou </loop:${client.SlashCommandData["loop"].id}> no tipo \`queue\` para dar loop em apenas uma música.`
        );
      } else {
        interaction.reply(
          `:arrow_right_hook: Agora a nem a fila e nem a música está em loop! Use </loop:${client.SlashCommandData["loop"].id}> em \`music/queue\` para dar loop em oque você quiser.`
        );
      }

      client.distube.setRepeatMode(queue, selectedType);
    } catch (error) {
      console.log("loop error?:", error);
      return interaction.reply({
        content:
          ":question::x: Não foi possivel loopar a música... Sim, isso é um erro inesperado.. 😗",
        ephemeral: true,
      });
    }
  }
};

exports.config = new SlashCommandBuilder()
  .setName("loop")
  .setDescription("Faz com que qualquer música que seja tocada fique em loop.")
  .addStringOption((option) =>
    option
      .setName("type")
      .setDescription("Qual modo você gostaria usar o loop?")
      .setRequired(true)
      .addChoices(
        { name: "queue", value: "queue" },
        { name: "music", value: "music" },
        { name: "disable", value: "none" },
        { name: "status", value: "status" }
      )
  );

exports.others = {
  InVoiceChannel: true,
};
