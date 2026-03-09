const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const { getPrefix } = require("../../modules/serverPrefix.js");

exports.run = async (client, message, args) => {
  const current_prefix = await getPrefix(message);

  const random_titulo = [
    "Eu ouvi alguém pedindo ajuda!?",
    "Alguém pediu ajuda?",
    "Olá, eu ouvi por alguem pedindo minha ajuda.",
    "O suporte chegou!",
    "Olá!!",
  ];

  const random_fim = [
    "Putz...",
    "Eita...",
    "E se eu te contar que...",
    "F",
    "Oh não",
    "Fim de jogo",
    "Rapazzzzzz",
    "Acabou a diversão..",
    "Timer chegou a 0!",
    ":person_gesturing_no:",
    "A não.",
    "Ai nãããão!",
    "Ixi..",
  ];
  const selected_titulo =
    random_titulo[Math.floor(Math.random() * random_titulo.length)];
  const selected_fim =
    random_fim[Math.floor(Math.random() * random_fim.length)];

  const starter_embed = new EmbedBuilder()
    .setColor("Gold")
    .setTitle(selected_titulo)
    .setDescription(
      "Olá sou um bot focado em tocar músicas brasileiro, Aqui está meus comandos:"
    )
    .setFields(
      {
        name: "**Úteis --------------------------------------------**",
        value: "Sobre coisas que podem ser úteis",
        inline: false,
      },
      {
        name: "Prefixo: ",
        value:
          "Prefixo atual: `" +
          current_prefix +
          "`\nExemplo: `" +
          current_prefix +
          "comandosuperlegal`",
        inline: false,
      },
      {
        name: "Informações mais detalhadas:",
        value:
          "`" +
          current_prefix +
          "botinfo`:" +
          " Mostra mais detalhadamente as informações sobre o bot.",
        inline: false,
      },
      {
        name: "**Outros --------------------------------------------**",
        value: "Sobre outras coisas",
        inline: false,
      },
      {
        name: "Desenvolvedores: ",
        value: `\`@${client.owner.username}\``,
        inline: false,
      },
      {
        name: "**Notas --------------------------------------------**",
        value: "Sobre algumas notas do criador etc..",
        inline: false,
      },
      {
        name: client.owner.username + ":",
        value: "`Aaaaa 👍`",
        inline: false,
      },
      {
        name: "Repositorio - Github",
        value: "`O repositorio do Bot foi privado. Data: 25/06/2022`",
        inline: false,
      },
      {
        name: "**Botões --------------------------------------------**",
        value: "Sobre os botões a baixo.",
        inline: false,
      },
      {
        name: "Botão - Voltar",
        value: "Volta para a pagina principal _(essa)_",
        inline: false,
      },
      {
        name: "Botão - Comandos",
        value: "Vai para a pagina de comandos _(apenas disponiveis)_",
        inline: false,
      },
      {
        name: "Botão - Comandos em `DESENVOLVIMENTO`",
        value:
          "Vai para a pagina de comandos que não estão funcionais _`(em desenvolvimento)`_",
        inline: false,
      }
    )
    .setTimestamp();

  const end_embed = new EmbedBuilder()
    .setColor("Red")
    .setTitle(selected_fim + " - Fim dessa interação!")
    .setDescription(
      "Esse comando expirou :(\nuse novamente o `" +
        current_prefix +
        "help` para me reativar!\nO comando `" +
        current_prefix +
        "help` tem uma duração de 600s até ser expirada."
    )
    .setTimestamp();

  const rows = new ActionRowBuilder().addComponents(
    (Back_B = new ButtonBuilder()
      .setCustomId("Back_B")
      .setLabel("Voltar")
      .setDisabled(true)
      .setStyle("Primary")),
    (Cmds_B = new ButtonBuilder()
      .setCustomId("Cmds_B")
      .setLabel("Comandos")
      .setDisabled(false)
      .setStyle("Secondary")),
    (DevCmds_B = new ButtonBuilder()
      .setCustomId("DevCmds_B")
      .setLabel("Comandos em DESENVOLVIMENTO")
      .setDisabled(false)
      .setStyle("Secondary")),
    (GitHub_B = new ButtonBuilder()
      .setLabel("Repositorio PRIVADO - GitHub")
      .setURL("https://github.com/RamiresOliv/Bot_Music")
      .setDisabled(true)
      .setStyle("Link"))
  );
  try {
    message
      .reply({ ephemeral: true, embeds: [starter_embed], components: [rows] })
      .then((msg) => {
        const filter1 = (i) =>
          i.customId === "Back_B" && i.user.id === message.author.id;
        const filter2 = (i) =>
          i.customId === "Cmds_B" && i.user.id === message.author.id;
        const filter3 = (i) =>
          i.customId === "DevCmds_B" && i.user.id === message.author.id;

        const cmds = msg.channel.createMessageComponentCollector({
          filter1,
          time: 60000,
        });
        const back = msg.channel.createMessageComponentCollector({
          filter2,
          time: 60000,
        });
        const dev_cmds = msg.channel.createMessageComponentCollector({
          filter3,
          time: 60000,
        });
        cmds.on("collect", (i) => {
          if (i.customId == "Cmds_B") {
            rows.setComponents(
              Back_B.setStyle("Secondary").setDisabled(false),
              Cmds_B.setStyle("Primary").setDisabled(true),
              DevCmds_B.setStyle("Secondary").setDisabled(false)
            );
            const embed1 = new EmbedBuilder()
              .setColor("#5865f2")
              .setTitle("Página - Comandos")
              .setDescription("Aqui está meus comandos:")
              .setTimestamp();

            const commands_ = readdirSync("./commands/chat").filter((file) =>
              file.endsWith(".js")
            );
            for (const file of commands_) {
              const file_request = require(`./${file}`);
              const indev = file_request.config.InDev || false;
              if (!indev) {
                var aliasesInString = "";

                if (file_request.config.aliases) {
                  file_request.config.aliases.forEach((v, i) => {
                    if (i == 0) {
                      aliasesInString = aliasesInString + current_prefix + v;
                    } else {
                      aliasesInString =
                        aliasesInString + ", " + current_prefix + v;
                    }
                  });
                } else {
                  aliasesInString = "N/A";
                }

                embed1.addFields([
                  {
                    name:
                      "`" + current_prefix + file_request.config.name + "`:",
                    value:
                      file_request.config.description +
                      "\n **Modo de uso:** `" +
                      current_prefix +
                      file_request.config.usage +
                      "`" +
                      "\n **Aliases:** `" +
                      aliasesInString +
                      "`",
                  },
                ]);
              }
            }
            msg.edit({ embeds: [embed1], components: [rows] });
            i.deferUpdate();
          } else if (i.customId == "DevCmds_B") {
            rows.setComponents(
              Back_B.setStyle("Secondary").setDisabled(false),
              Cmds_B.setStyle("Secondary").setDisabled(false),
              DevCmds_B.setStyle("Primary").setDisabled(true)
            );
            const embed2 = new EmbedBuilder()
              .setColor("Red")
              .setTitle("Página - Comandos em Desenvolvimentos")
              .setDescription(
                "_(não disponivels)_ Comandos em desenvolvimentos:"
              )
              .setTimestamp();

            const indev_commands = readdirSync("./commands/chat").filter(
              (file) => file.endsWith(".js")
            );
            for (const file_indev of indev_commands) {
              const file_request_indev = require(`./${file_indev}`);
              const indev = file_request_indev.config.InDev || false;
              if (indev) {
                embed2.addFields([
                  {
                    name:
                      "`" +
                      current_prefix +
                      file_request_indev.config.name +
                      "`:",
                    value:
                      file_request_indev.config.description +
                      "\n **Modo de uso:** `" +
                      current_prefix +
                      file_request_indev.config.usage +
                      "`",
                  },
                ]);
              }
            }
            msg.edit({ embeds: [embed2], components: [rows] });
            i.deferUpdate();
          } else if (i.customId == "Back_B") {
            rows.setComponents(
              Back_B.setStyle("Primary").setDisabled(true),
              Cmds_B.setStyle("Secondary").setDisabled(false),
              DevCmds_B.setStyle("Secondary").setDisabled(false),
              GitHub_B.setLabel("Repositorio - GitHub")
                .setURL("https://github.com/RamiresOliv/Bot_Music")
                .setDisabled(true)
                .setStyle("Link")
            );
            msg.edit({ embeds: [starter_embed], components: [rows] });
            i.deferUpdate();
          }
        });
        setTimeout(() => {
          try {
            msg.channel.messages
              .fetch(msg.id)
              .then(() => {
                msg.edit({ embeds: [end_embed], components: [] });
              })
              .catch(console);
          } catch (err) {
            console.log("Não foi possivel fazer alguma coisa.");
          }
        }, 600000);
      });
  } catch {
    message.reply("Não foi possivel carregar...");
  }
};

exports.config = {
  name: "help",
  usage: "help",
  aliases: ["ajuda", "h", "cmds", "comandos", "commands"],
  description: "Mostra os comandos disponiveis do bot.",

  IgnoreDeprecatedWarning: true,
  InVoiceChannel: false,
};
