const { PermissionFlagsBits } = require("discord.js");
const { logTime } = require("../../../modules/logSystem.js");
const { getPrefix } = require("../../../modules/serverPrefix.js");

exports.loadFunction = async (client, configs, adicional) => {
  // adicional[0] = message
  let message = adicional[0];

  if (message.webhookID) return;
  if (!message.author) return;
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;
  const mention = message.mentions.members.first();
  current_prefix = await getPrefix(message);
  if (configs.testStart == true) {
    console.log(
      `${logTime("/Test/Aborted") + bcolors.FAIL} in test version. ${
        bcolors.WARNING
      }"configs.testStart == true"${
        bcolors.FAIL
      }, the script don't will give response.` + bcolors.ENDC
    );
    return;
  }
  if (
    !message.guild.members.me.permissionsIn(message.channel).has(
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.EmbedLinks /*,
        PermissionFlagsBits.Connect,
        PermissionFlagsBits.AddReactions*/
    )
  )
    return;
  if (message.content == "<@" + client.user.id + ">")
    message.reply(
      `*Use \`${current_prefix}help\` para ver meus comandos ou começe a festa com </play:${client.SlashCommandData["play"].id}>*`
    );
  if (!message.content.startsWith(current_prefix)) return;
  const args = message.content.slice(current_prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();
  const exec =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));
  if (command == "") command = "~nada~";
  if (command == "~nada~") return;
  if (!exec)
    return message.reply(
      `:x: O comando \`${command}\`, não existe ou aconteceu um erro não esperado`
    );
  if (exec.config.InVoiceChannel && !message.member.voice.channel) {
    return message.reply(
      ":question::x: Desculpe mas você não está em nenhum canal de voz! :("
    );
  }
  try {
    if (configs.ChatCommandsDeprecatedWarning) {
      var msgString =
        "## 🔗 Chat Commands: DEPRECATED\nEi! <@" +
        message.author +
        ">, Os comandos via chat estão oficialmente encerrados...\nAgora novos comandos como </previous:" +
        client.SlashCommandData["previous"].id +
        "> só está disponível no Slash Commands.";
      if (client.SlashCommandData[exec.config.name]) {
        msgString =
          msgString +
          `\nInclusive, achei esse mesmo comando disponível como Slash: </${
            exec.config.name
          }:${client.SlashCommandData[exec.config.name].id}>`;
      }
      message.channel.send(msgString);
    }
    exec.run(client, message, args);
  } catch (err) {
    message.reply(
      `Problemas com o código! \`\`\`js\n${err}\`\`\`Porfavor espere o problema ser resolvido e volte depois.. Desculpe.`
    );
    console.log(
      `${logTime(
        "/Error/Exited"
      )} Algo deu errado ao executar o comando ${command}`
    );
    console.log(err.stack);
  }
};
