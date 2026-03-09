exports.run = async (client, message, args) => {
  message.reply(
    `🏓Pong! A latência é de \`${
      Date.now() - message.createdTimestamp
    }ms\`. latência da API é de \`${Math.round(client.ws.ping)}ms\``
  );
};

exports.config = {
  name: "ping",
  usage: "ping",
  aliases: ["pong", "pp"],
  description: "Pong!",

  IgnoreDeprecatedWarning: true,
  InVoiceChannel: false,
};
