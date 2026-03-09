const { ActionRowBuilder, ButtonBuilder, SlashCommandBuilder } = require("discord.js");

function getEmoji(raw) {
  const rawRemake = raw.split(':')
  for (const value of rawRemake) {
    const index = rawRemake.indexOf(value)
    rawRemake[index] = value.replace("<", "").replace(">", "")
  }
  rawRemake.shift()
	return rawRemake;
}

exports.run = async (client, interaction) => {
  const emoji = interaction.options.getString("emoji");
  raw = getEmoji(emoji)
  
  if (!raw[0]) {
    return interaction.reply({
      content: "<a:esqueletico:1185925681155145739> Eu.. Tava analisando esse emoji que você me pediu.. Mas.. Ele não parece ser um emoji de algum servidor `[Wrong format]`",
      ephemeral: true,
    })
  }
  interaction.reply({
    content: "## " + emoji + ", Achei! \n> Name: `" + raw[0] + "`\n> ID: `" + raw[1] + "`\n> Raw: `" + emoji + "`" + `
      ## :bulb: Esse é um comando experimental\nFormula usada:
      \`\`\`js
function getEmoji(raw) {
  const rawRemake = raw.split(':')
    for (const value of rawRemake) {
      const index = rawRemake.indexOf(value)
      rawRemake[index] = value.replace("<", "").replace(">", "")
    }
  rawRemake.shift()
  return rawRemake;
}\`\`\``,
    ephemeral: true,
  })
};

exports.config = new SlashCommandBuilder()
	.setName('emojidat')
	.setDescription("Shows informations about all servers emojis. [DEV DEBUG]")
  .addStringOption(option =>
		option.setName('emoji')
	 	 .setDescription('Insert emoji here')
      .setRequired(true))

exports.others = {
  InDev: false,
  InVoiceChannel: false,
}