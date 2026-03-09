const {
  PermissionFlagsBits,
  SlashCommandBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  Events,
} = require("discord.js");

exports.run = async (client, interaction) => {
  const newVolume = Number(interaction.options.getString("volume"));

  if (!interaction.member.permissions.has(PermissionFlagsBits.Connect)) {
    return interaction.reply({
      content:
        ":question::x: Desculpe mas você não pode entrar em canais de voz! :(",
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

  if (newVolume == NaN || newVolume >= 201 || newVolume < 0) {
    return interaction.reply({
      content:
        ":question::x: Desculpe mas o volume precisa ser entre 0% à 200% :(",
      ephemeral: true,
    });
  }

  const queue = client.distube.getQueue(interaction.channel);
  if (!queue) {
    return interaction.reply({
      content: ":question::x: Não estou tocando nada para mudar o volume.",
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

  if (newVolume > 100) {
    const rows = new ActionRowBuilder().addComponents(
      (VolumeCMD_Accept = new ButtonBuilder()
        .setCustomId(interaction.id + ".VolumeCMD_Accept")
        .setLabel("Aceitar")
        .setDisabled(false)
        .setStyle("Success")),
      (VolumeCMD_Recuse = new ButtonBuilder()
        .setCustomId(interaction.id + ".VolumeCMD_Recuse")
        .setLabel("Cancelar")
        .setDisabled(false)
        .setStyle("Danger"))
    );

    return interaction
      .reply({
        content:
          "> :exclamation::warning: **Ei!**\n> Para algumas pessoas um volume maior que 100% pode ser ruim! Você tem CERTEZA que desejá continuar?\n> Isso pode ser alto e estourado. Desejá mesmo fazer isso?",
        components: [rows],
        ephemeral: true,
      })
      .then((msg) => {
        const filter = (m) =>
          m.customId === "VolumeCMD_Accept" ||
          ("VolumeCMD_Recuse" && m.member.id === interaction.member.id);
        const collector = interaction.channel.createMessageComponentCollector({
          filter: filter,
          max: 1,
          time: 10000,
        });

        collector.on("collect", async (i) => {
          if (!i.isButton()) return;
          if (i.customId == interaction.id + ".VolumeCMD_Accept") {
            await interaction.editReply({
              content: "✔ Aceito.",
              components: [],
            });
            try {
              const new_volume = await queue.setVolume(newVolume);
              return interaction.followUp(
                ":headphones::loud_sound: `" +
                  interaction.member.user.tag +
                  "`, agora o meu volume foi para `" +
                  newVolume +
                  "%`."
              );
            } catch (error) {
              console.log("volume error?:", error);
              return interaction.followUp({
                content:
                  ":question::x: Hm, não foi possivel mudar o volume da música!",
                ephemeral: true,
              });
            }
          } else if (i.customId == interaction.id + ".VolumeCMD_Recuse") {
            return await interaction.editReply({
              content: ":x: Recusado.",
              components: [],
            });
          }
        });
      });
  }

  try {
    const new_volume = await queue.setVolume(newVolume);
    interaction.reply(
      ":headphones::loud_sound: Agora o volume da música foi para `" +
        newVolume +
        "%`."
    );
  } catch (error) {
    console.log("volume error?:", error);
    return interaction.reply({
      content: ":question::x: Hm, Não foi possivel mudar o volume da música!",
      ephemeral: true,
    });
  }
};

exports.config = new SlashCommandBuilder()
  .setName("volume")
  .setDescription(
    "Com esse comando você pode setar qualquer volume para a queue."
  )
  .addStringOption((option) =>
    option
      .setName("volume")
      .setDescription("Defina um volume de 0% até 200% o padrão é 100%")
      .setMaxLength(3)
      .setRequired(true)
  );

exports.others = {
  InVoiceChannel: true,
};
