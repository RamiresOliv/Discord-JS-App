const { ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");
const database = require("local-db-express");

const commandCollection_Name = "Command-Hello"


exports.run = async (client, interaction, commandinfo) => {
  const commandCollection = await database.collection.exists(commandCollection_Name);
  if (!commandCollection.exists) {
    database.collection.create(commandCollection_Name);
  }
  
	const targetUser = interaction.targetUser;

  const UserData = await commandCollection.get(interaction.user.id)
  if (interaction.user.id == targetUser.id || targetUser.id == interaction.guild.ownerId) {
    let string = `:interrobang: Você tentou, mas não conseguiu. Tente outra pessoa!`
    if (targetUser.id == interaction.guild.ownerId) {
      string = `:interrobang: Você tentou, mas você ainda sim, não conseguiu alcançar o dono do servidor. Tente outra pessoa!`
    }
    if (UserData.document) {
      string += ` Tente usar esse mesmo comando com o tal <@${UserData.document}>`
    }
    return interaction.reply({
      content: string,
      ephemeral: true
    });
  }
  
  const UserDataExists = await commandCollection.docExists(interaction.user.id)
  if (!UserDataExists) {
      await commandCollection.add(interaction.user.id, targetUser.id)
  } else {
      await commandCollection.update(interaction.user.id, (oldData) => {
        return targetUser.id
      })
  }
  interaction.reply({
    content: `<@${interaction.user.id}>, mandou um Hello para você! <@${targetUser.id}> (Use nele \`${exports.config.name}\` para responder!!)`,
    ephemeral: false
  });
};

exports.config = new ContextMenuCommandBuilder()
	.setName('Reply Hello')
	.setType(ApplicationCommandType.User);

exports.others = {
  InDev: false,
  InVoiceChannel: false,
}