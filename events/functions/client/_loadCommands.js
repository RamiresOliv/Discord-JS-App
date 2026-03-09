const { Collection, Routes } = require("discord.js");
const { logTime, bcolors } = require("../../../modules/logSystem.js");
const { readdirSync, readFileSync, writeFileSync } = require("fs");

exports.loadFunction = async (client, configs, adicional) => {
  // adicional[0] = null
  if (configs.testStart == true) {
    return console.log(
      `${logTime("/Test/Aborted") + bcolors.FAIL} in test version. ${
        bcolors.WARNING
      }"configs.testStart == true"${
        bcolors.FAIL
      }, the script don't will response NOTHING.` + bcolors.ENDC
    );
  }
  client.commands = new Collection();
  client.aliases = new Collection();
  const commands = readdirSync("./commands/chat").filter((file) =>
    file.endsWith(".js")
  );
  if (commands.length < 1)
    return console.log(
      `${logTime("/Error")} ${bcolors.FAIL}Nenhum comando foi encontrado.` +
        bcolors.ENDC
    );
  console.log(`${logTime("/Commands/Loading")} Comandos carregados:`);
  commands.forEach((f) => {
    const pull = require(`../../../commands/chat/${f}`);
    const indev = pull.config.InDev || false;
    if (!indev) {
      client.commands.set(pull.config.name, pull);
      if (pull.config.aliases) {
        pull.config.aliases.forEach((v, i) => {
          client.aliases.set(v.toLowerCase(), pull.config.name.toLowerCase());
        });
      }
      console.log(
        `${logTime("/Commands/Loaded")} Comando ${
          bcolors.OKGREEN + `'${f}'` + bcolors.ENDC
        } carregado;`
      );
    }
  });

  console.log(
    `${logTime("/Commands/Finish")} O total de ${
      bcolors.WARNING + client.commands.size + bcolors.ENDC
    } comandos carregados de ${
      bcolors.WARNING + commands.length + bcolors.ENDC
    }.`
  );
};
