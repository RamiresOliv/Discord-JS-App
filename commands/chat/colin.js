const { Message } = require("discord.js");

exports.run = async (client, message, args) => {
  message.reply({ files: ["./images/Colin.png"] });
};

exports.config = {
  name: "colin",
  usage: "colin",
  description: "colin???? q?",

  InDev: true,
  InVoiceChannel: true,
};
