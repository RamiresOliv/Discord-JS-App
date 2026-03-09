// "Privated App"
// Check Lisense: ./LISENSE

//                                                    SETUPS
const { Client, GatewayIntentBits, Events, REST } = require("discord.js");
const { logTime } = require("./modules/logSystem.js");
const { YouTubePlugin } = require("@distube/youtube");
const { SpotifyPlugin } = require("@distube/spotify");
const { distubeConf, distubeSpotify } = require("./configs/config.json");
const { DisTube } = require("distube");
const toolbox = require("gluegun");
const modulesPath = "./";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

/*

    "@distube/spotify": "^1.4.2",
    "@distube/yt-dlp": "^1.1.3",
    "@distube/ytdl-core": "^4.13.3",
    "@distube/ytpl": "^1.1.1",
*/

//                                                    LOADS
//distubeConf["ffmpeg"] = {
//  path: __dirname + "/modules/ffmpeg/ffmpeg.exe",
//};

// REST load up.
client.REST = new REST({ version: "10" }).setToken(
  require("./configs/token/myToken.json")
);

// DisTube load up.
client.distube = new DisTube(
  client,
  {
    plugins: [new YouTubePlugin(), new SpotifyPlugin(distubeSpotify)],
  },
  distubeConf
); // Creates a new DisTube with the settings in the file './configs/config.json'.
client.distube.setMaxListeners(0); // Set the maximum of Listeners for DisTube (0 = inf)

// Bot worker:
// ...

//                                                    EVENTS HANDLER
const { FullLoad } = require("./events/eventsHandler.js");

const spinner = toolbox.print.spin(
  toolbox.print.colors.highlight("RUN: ") +
    "Aguardando Servidores... expected: " +
    toolbox.print.colors.yellow("~1.4000+ms")
);
let startTime = new Date();
FullLoad(client, {
  process: process,
  client: client,
  distube: client.distube,
}).then((realMS) => {
  //                                                    BOT LOGIN
  setTimeout(() => {
    let RealtimeElapsed = realMS - startTime;
    let NowtimeElapsed = new Date() - startTime;
    spinner.succeed(
      toolbox.print.colors.highlight("RUN: ") +
        "🏓 Iniciando... Olá. {total " +
        toolbox.print.colors.yellow((NowtimeElapsed /= 1000) + "ms") +
        ", real " +
        toolbox.print.colors.yellow((RealtimeElapsed /= 1000) + "ms") +
        "}"
    );
    client.login(require("./configs/token/myToken.json"));
  }, 1430);
});
