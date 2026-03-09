const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

exports.run = async (client, interaction) => {
  if (!interaction.member.permissions.has(PermissionFlagsBits.Connect)) {
    return interaction.reply({
      content: ":question::x: Desculpe mas você não pode entrar em canais de voz! :(",
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
    if (queue && channel.id == queue.voiceChannel.id) {
      return interaction.reply({
        content: ":x: Você já está no mesmo canal que eu.",
        ephemeral: true,
      })
    }
    
    const next_song = await queue.skip();
    interaction.reply(
      ":hash: Certo! A caixa de som mudou de canal."
    );
  } catch (error) {
    console.log("jump error?:", error);
    return interaction.reply({
      content: ":question::x: Hm, Não foi possivel pular de canal!",
      ephemeral: true,
    });
  }
};

exports.config = new SlashCommandBuilder()
	.setName('jump')
	.setDescription("Pula a para qualquer canal que você desejá.")

exports.others = {
  InDev: true,
  InVoiceChannel: true,
}