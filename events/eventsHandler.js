const { Collection } = require("discord.js");
const { logTime } = require("../modules/logSystem.js");
const { readdirSync, readFileSync, writeFileSync } = require("fs");
const configs = require("../configs/config.json");

const base = __dirname + "/../events/";

var EventsLoadAmount = 0;
var EventsIgoredAmount = 0;

exports.Finish = (client) => {
  return [
    true,
    Math.round(client.ws.ping),
    EventsLoadAmount,
    EventsIgoredAmount,
  ];
};

function existsIn(array, value) {
  for (var v of array) {
    if (v == value) return true;
  }
  return false;
}

exports.FullLoad = async (client, identifys) => {
  const functionsF = readdirSync(base + "functions").filter(
    (name) => !name.includes(".")
  );
  for (var eventType of functionsF) {
    const exists = existsIn(Object.keys(identifys), eventType);
    if (exists) {
      const EventsRead = readdirSync(base + "functions/" + eventType).filter(
        (name) => name.endsWith(".js")
      );
      for (var event of EventsRead) {
        if (!event.startsWith("_")) {
          const request = require(base +
            "functions/" +
            eventType +
            "/" +
            event);
          try {
            identifys[eventType].on(
              event.replace(".js", ""),
              async (thing1, thing2, thing3) => {
                try {
                  await request.loadFunction(client, configs, [
                    thing1,
                    thing2,
                    thing3,
                  ]);
                } catch (err) {
                  console.log("(ERROR HANDLED!) Error inside event:", err);
                }
              }
            );
            EventsLoadAmount += 1;
          } catch (err) {
            EventsIgoredAmount += 1;
            console.warn(bcolors.WARNING + err + bcolors.ENDC);
          }
        }
      }
    } else {
      console.warn(
        logTime(addedMsg) +
          " " +
          bcolors.WARNING +
          "Alert: '" +
          folderName +
          "' don't exists nidentifyeds collections. This directory has been ignored." +
          bcolors.ENDC
      );
    }
  }
  let endTime = new Date();
  return endTime;
};

exports.load = async (module, client, adicional) => {
  if (!client) {
    throw new Error("É necessario definir o 'client' nos eventos.");
  }
  const moduleName = module.split("-");
  if (readFileSync(`./events/functions/${moduleName[0]}/${moduleName[1]}.js`)) {
    const file = require(`./functions/${moduleName[0]}/${moduleName[1]}.js`);

    try {
      await file.loadFunction(
        client,
        require("../configs/config.json"),
        adicional
      );
    } catch (error) {
      console.log(
        logTime("/Events/Error") +
          ` Foi impossivel continuar pois aconteceu algum erro em "${moduleName[1]}.js",`
      );
      console.log(error);
    }
  } else {
    throw new Error(
      `Não foi possivel carregar o modulo ${moduleName}! Porque o modulo não foi achado.`
    );
  }
};
