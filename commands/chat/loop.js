const { PermissionFlagsBits } = require("discord.js");
const { getPrefix } = require("../../modules/serverPrefix.js");

const loopTypes = {
  none: 1,
  music: 1,
  current: 1,
  música: 1,
  um: 1,
  uma: 1,

  all: 2,
  fila: 2,
  tudo: 2,
  tudin: 2,
  tudim: 2,
  queue: 2,
};

exports.run = async (client, message, args) => {
  const prefix = await getPrefix(message);

  const queue = client.distube.getQueue(message);
  if (!message.member.permissions.has(PermissionFlagsBits.Connect)) {
    return message.reply(
      ":question::x: Desculpe mas você não pode entrar em canais de voz! :("
    );
  }

  if (!queue) {
    return message.reply(
      ":question::x: Não foi possivel executar esse comando pois nenhuma música está tocando agora."
    );
  }

  const channel = message.member.voice.channel;
  if (queue && channel.id != queue.voiceChannel.id) {
    return message.reply(
      ":x: Você não pode usar o loop sem estár no mesmo canal que a música está tocando."
    );
  }

  if (args[0] == "status") {
    if (queue.repeatMode == 1) {
      message.reply(":repeat_one: loop está ativado apenás nessa música!");
    } else if (queue.repeatMode == 2) {
      message.reply(":repeat_one: loop está ativado em toda fila!");
    } else {
      message.reply(`:repeat_one: loop está desativado!`);
    }
  } else {
    try {
      if (
        (queue.repeatMode == 1 && !args[0]) ||
        (queue.repeatMode == 2 && !args[0])
      ) {
        message.reply(":stop_button: loop desativado!");
        client.distube.setRepeatMode(queue, 0);
      } else {
        const selectedType = loopTypes[(args[0] || "none").toLowerCase()];

        if (selectedType == 1) {
          message.reply(
            `:repeat_one: Agora apenas essa música está em loop! Use \`${prefix}stop\` para parar a música ou \`${prefix}loop queue\` para dar loop na fila inteira.`
          );
        } else {
          message.reply(
            `:repeat: Agora a fila inteira está em loop! Use \`${prefix}stop\` para parar a música ou \`${prefix}loop music\` para dar loop em apenas uma música.`
          );
        }

        client.distube.setRepeatMode(queue, selectedType);
      }
    } catch (error) {
      message.reply(
        ":question::x: Não foi possivel loopar a música... Sim, isso é um erro inesperado.. 😗"
      );
      console.log("loop error?:", error);
    }
  }
};

exports.config = {
  name: "loop",
  usage: "loop (queue/music)",
  aliases: ["repetir", "l"],
  description: "Faz com que qualquer música que seja tocada fique em loop.",

  InVoiceChannel: true,
};
