const { PermissionFlagsBits } = require("discord.js");
const { getPrefix } = require("../../../modules/serverPrefix.js");

exports.loadFunction = async (client, configs, adicional) => {
  const interaction = adicional[0];

  if (!interaction.isChatInputCommand() && !interaction.isContextMenuCommand())
    return;

  const exec = client.SlashCommands.get(interaction.commandName);
  if (!exec)
    return interaction.reply(
      `:x: O comando \`${interaction.commandName}\`, não existe ou aconteceu um erro não esperado`
    );
  if (exec.others.InVoiceChannel && !interaction.member.voice.channel) {
    return interaction.reply({
      content:
        ":question::x: Desculpe mas você não está em nenhum canal de voz! :(",
      ephemeral: true,
    });
  }
  try {
    exec.run(client, interaction);
  } catch (err) {
    interaction.reply({
      content: `Problemas com o código! \`\`\`js\n${err}\`\`\`Porfavor espere o problema ser resolvido e volte depois.. Desculpe.`,
      ephemeral: true,
    });
    console.log(
      `${logTime(
        "/Error/Exited"
      )} Algo deu errado ao executar o comando ${command}`
    );
    return console.log(err.stack);
  }
};
