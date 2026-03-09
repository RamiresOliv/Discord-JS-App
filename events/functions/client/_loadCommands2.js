const { Collection, Routes } = require("discord.js");
const { logTime, bcolors } = require("../../../modules/logSystem.js");
const { readdirSync, readFileSync, writeFileSync } = require("fs");

exports.loadFunction = async (client, configs, adicional) => {
  // adicional[0] = null
  if (configs.testStart == true) {
    return "nil";
  }
  loadSlash = [];
  client.SlashCommands = new Collection();
  const commands = readdirSync("./commands/slash").filter((file) =>
    file.endsWith(".js")
  );
  if (commands.length < 1)
    return console.log(
      `${logTime("/Error")} ${bcolors.FAIL}(/) Nenhum comando foi encontrado.` +
        bcolors.ENDC
    );
  console.log(`${logTime("/Commands/Loading")} (/) Comandos carregados:`);
  commands.forEach((f) => {
    const pull = require(`../../../commands/slash/${f}`);
    const indev = pull.others.InDev || false;
    if (!indev) {
      loadSlash.push(pull.config.toJSON());
      client.SlashCommands.set(pull.config.name, pull);

      console.log(
        `${logTime("/Commands/Loaded")} (/) Comando ${
          bcolors.OKGREEN + `'${f}'` + bcolors.ENDC
        } carregado;`
      );
    }
  });

  const commands_menu = readdirSync("./commands/menu").filter((file) =>
    file.endsWith(".js")
  );
  commands_menu.forEach((f) => {
    const pull = require(`../../../commands/menu/${f}`);
    const indev = pull.others.InDev || false;
    if (!indev) {
      loadSlash.push(pull.config.toJSON());
      client.SlashCommands.set(pull.config.name, pull);

      console.log(
        `${logTime("/Commands/Loaded")} (/) (MENU) Comando ${
          bcolors.OKGREEN + `'${f}'` + bcolors.ENDC
        } carregado;`
      );
    }
  });

  const ApiResult = await client.REST.put(
    Routes.applicationCommands(client.user.id),
    { body: loadSlash }
  );

  client.SlashCommandData = {};
  ApiResult.forEach((command) => {
    client.SlashCommandData[command.name] = command;
    delete client.SlashCommandData[command.name]["name"];
  });

  console.log(
    `${logTime("/Commands/Finish")} (/) O total de ${
      bcolors.WARNING + client.SlashCommands.size + bcolors.ENDC
    } comandos carregados de ${
      bcolors.WARNING + commands.length + bcolors.ENDC
    }.`
  );
};
