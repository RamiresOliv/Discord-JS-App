const { load, Finish } = require("../../eventsHandler");
const { server } = require("../../../configs/config.json");
const { logTime, bcolors } = require("../../../modules/logSystem.js");
const { ActivityType, version } = require("discord.js");
const { copyFileSync } = require("fs");
const db = require("local-db-express");

const myPort = 4040; // Server port.
const publicURL = "https://jb.ramiresoliv.repl.co";

db.collection.create("client").then((collection) => {
  db.document.add(collection, "AddedSongs", 0);
});

exports.loadFunction = async (client, configs, adicional) => {
  // adicional[0] = null
  client.owner = "loading...";
  await client.users.fetch(configs.ownerId).then((me) => (client.owner = me)); // Ramiro

  client.user.setPresence({
    activities: [{ name: "meu startup...", type: ActivityType.Watching }],
    status: "idle",
  });
  console.log("-".repeat(80));
  date = new Date();
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formattedDate = formatter.format(date);

  console.log(
    "                        " +
      bcolors.HEADER +
      formattedDate +
      " - BOT START UP:" +
      bcolors.ENDC
  );
  console.log(" ");
  await load("client-_loadCommands", client, configs);
  console.log("-".repeat(80));
  await load("client-_loadCommands2", client, configs);
  console.log("-".repeat(80));
  console.log(`${logTime()} Loading...`);
  setTimeout(async () => {
    console.log(
      `${logTime()} ${bcolors.UNDERLINE + bcolors.BOLD}Ready!${
        bcolors.ENDC
      } (Finished)`
    );
    console.log(
      `${logTime()} App logado: ${client.user.tag} de @${
        client.owner.username /*+ "#" + client.owner.discriminator*/
      }?`
    );
    try {
      const result = Finish(client);
      if (result[0] == true) {
        const wsPing = Math.round(client.ws.ping);
        console.log(
          logTime("/Events") +
            ` Hello World! Pronto para mais um dia! API Ping: ${
              wsPing <= 0
                ? bcolors.FAIL +
                  wsPing +
                  bcolors.UNDERLINE +
                  bcolors.BOLD +
                  "?" +
                  bcolors.ENDC
                : bcolors.WARNING + wsPing + bcolors.ENDC
            }`
        );
        console.log(
          logTime("/Events") +
            " Foi identificado o total de " +
            bcolors.WARNING +
            result[2] +
            bcolors.ENDC +
            " eventos de " +
            bcolors.WARNING +
            result[3] +
            bcolors.ENDC +
            " falhados."
        );
      } else throw Error();
    } catch {
      console.log(
        logTime("/Events/Error/CRITICAL") +
          bcolors.FAIL +
          " Sistema de eventos não iniciado! Algum erro ocorreu. " +
          bcolors.BOLD +
          bcolors.HEADER +
          "CRITICO!" +
          bcolors.ENDC
      );
    }
    try {
      if (db.finish() == true) {
        console.log(
          logTime("/Datastorage") + " Database system started! Successfully"
        );
      } else throw Error();
    } catch {
      console.log(
        logTime("/Datastorage/Error") +
          bcolors.FAIL +
          " Database system don't started! Some error ocurred." +
          bcolors.ENDC
      );
    }
    client.user.setPresence({
      activities: [{ name: "muitas músicas ;)", type: ActivityType.Listening }],
      status: "online",
    });

    // CUSTOM BEACAUSE APP IS RUNNING IN REPLIT or idk //
    const express = require("express");
    const app = express();
    app.set("trust proxy", server.trustProxy);
    app.use(express.json());
    app.use(express.static(server.static));

    copyFileSync(
      __dirname + "/../../../images/static/BotThumb.png",
      __dirname + "/../../../website/public/assets/images/BotThumb.png"
    );

    var dbres = await db.document.get("client", "AddedSongs");

    app.listen(server.port);
    client.localhost = server.url;
    const push = require("fs")
      .readFileSync(server.static + "/index.html")
      .toString()
      .replace("{Discord.version}", version)
      .replace("{Distube.version}", require("distube").version)
      .replace("{Client.ServersSize}", client.guilds.cache.size)
      .replace("{Client.user.avatarURL}", client.user.avatarURL())
      .replace("{Client.user.id}", client.user.id)
      .replace("{Invite.url.permissions}", "8")
      .replace("{Invite.url.scope}", "bot")
      .replace("{DB.MusicsPlayedTotal}", dbres.document.toString());
    app.get("/home", (req, res) => {
      res.send(push);
    });
    app.get("/images", (req, res) => {
      res.send(push);
    });
    app.get("/api/updatelul", async (req, res) => {
      dbres = await db.document.get("client", "AddedSongs");
      res.send({
        ServersSize: client.guilds.cache.size,
        MusicsPlayedTotal: dbres.document.toString(),
      });
    });
    console.log("-".repeat(80));
  }, 1000);
};
