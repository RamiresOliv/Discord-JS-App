const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");
const { filters } = require("../../configs/config.json");
const { getPrefix } = require("../../modules/serverPrefix.js");

exports.run = async (client, interaction) => {
  const prefix = await getPrefix(interaction.channel);

  if (!interaction.member.permissions.has(PermissionFlagsBits.Connect)) {
    return interaction.reply(
      ":question::x: Desculpe mas você não consegue entrar em canais de voz! :( `CONNECT`"
    );
  }

  const queue = client.distube.getQueue(interaction.channel);

  if (!queue) {
    return interaction.reply({
      content: ":question::x: Não estou tocando nada para filtrar.",
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

  if (interaction.options.getString("filter").toLowerCase() == "clear") {
    queue.filters.clear();
    return interaction.reply(":broom: Os filtros foram limpados/removidos.");
  }

  //console.log(filters[interaction.options.getString("filter").toLowerCase()])

  try {
    queue.filters.add(
      filters[interaction.options.getString("filter").toLowerCase()]
    );
    interaction.reply(
      ":control_knobs: Agora as músicas estão sendo filtradas com o filtro `" +
        interaction.options.getString("filter").toLowerCase() +
        "`. Caso queira removelo use </filter:" +
        client.SlashCommandData["filter"].id +
        "> em `clear`"
    );
  } catch (err) {
    interaction.reply({
      content: ":question::x: Porfavor mencione um filtro valido.",
      ephemeral: true,
    });
  }
};

exports.config = new SlashCommandBuilder()
  .setName("filter")
  .setDescription("Bora de bassboost? 😈")
  .addStringOption((option) =>
    option
      .setName("filter")
      .setDescription("O nome do filtro")
      .setRequired(true)
      .addChoices(
        { name: "clear", value: "clear" },
        { name: "custom", value: "custom" },
        { name: "rickroll", value: "rickroll" },
        { name: "bassboost", value: "bassboost" },
        { name: "superbassboost", value: "bassboost2" },
        { name: "8D", value: "8D" },
        { name: "vaporwave", value: "vaporwave" },
        { name: "nightcore", value: "nightcore" },
        { name: "phaser", value: "phaser" },
        { name: "tremolo", value: "tremolo" },
        { name: "vibrato", value: "vibrato" },
        { name: "reverse", value: "reverse" },
        { name: "slowreverb", value: "slowreverb" },
        { name: "treble", value: "treble" },
        { name: "normalizer", value: "normalizer" },
        { name: "surrounding", value: "surrounding" },
        { name: "pulsator", value: "pulsator" },
        { name: "subboost", value: "subboost" },
        { name: "karaoke", value: "karaoke" },
        { name: "flanger", value: "flanger" },
        { name: "gate", value: "gate" },
        { name: "haas", value: "haas" },
        { name: "mcompand", value: "mcompand" }
      )
  );

exports.others = {
  InVoiceChannel: true,
};
