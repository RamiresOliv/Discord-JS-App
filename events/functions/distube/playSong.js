const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { logTime } = require("../../../modules/logSystem.js");
const webp = require("webp-converter");
const https = require("https");
const {
  unlinkSync,
  readdirSync,
  createWriteStream,
  copyFileSync,
} = require("fs");
const imagesF_upload = readdirSync(__dirname + "/../../../images/temp/upload");
for (var v of imagesF_upload) {
  unlinkSync(__dirname + "/../../../images/temp/upload/" + v);
}
const imagesF_download = readdirSync(
  __dirname + "/../../../images/temp/download"
);
for (var v of imagesF_download) {
  unlinkSync(__dirname + "/../../../images/temp/download/" + v);
}

async function Imagehelperpls(client, song, url, callback) {
  if (url.endsWith("webp")) {
    const file = createWriteStream(
      __dirname + "/../../../images/temp/download/" + song.id + ".webp"
    );
    https.get(url, async function (response) {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        const result = webp.dwebp(
          "./images/temp/download/" + song.id + ".webp",
          "./images/temp/upload/" + song.id + ".png",
          "-o"
        );
        setTimeout(() => {
          unlinkSync(
            __dirname + "/../../../images/temp/download/" + song.id + ".webp"
          );
        }, 4000);
        result.then((res) => {
          return callback(
            false,
            __dirname + "/../../../images/temp/upload/" + song.id + ".png",
            song.id
          );
        });
      });
    });
  } else {
    return callback(true, url, toString(song.id));
  }
}

exports.loadFunction = async (client, configs, adicional) => {
  // adicional[0] = queue, adicional[1] = song

  if (adicional[0].repeatMode == 0) {
    const msg = await adicional[0].textChannel.send({
      content: `:headphones: Tocando agora: \`${adicional[1].name}\` _(carregando embed...)_`,
      embeds: [],
    });
    msg.react("🔥");
    console.log(
      `${logTime("/AUDIO/PLAYING")} Playing "${adicional[1].name}" - \`${
        adicional[1].formattedDuration
      }\` in "${adicional[0].textChannel.guild.name}"!`
    );
    let attachment = new AttachmentBuilder();
    attachment.setFile(__dirname + "/../../../images/Colin.png");
    attachment.setName(`Colin.png`);
    let files = [];
    Imagehelperpls(
      client,
      adicional[1],
      adicional[1].thumbnail,
      (isurl, path, name) => {
        const embed = new EmbedBuilder()
          .setAuthor({
            name: adicional[1].uploader.name,
            url: adicional[1].uploader.url,
          })
          .setTitle(adicional[1].name)
          .setURL(adicional[1].url)
          .setTimestamp();

        if (!isurl) {
          /*new AttachmentBuilder(__dirname + "/../../../images/Colin.png", {
            description: "'" + adicional[1].name + "' thumbnail",
          });*/

          attachment.setFile(path);
          attachment.setName(`${name}.png`);

          embed.setImage(`attachment://${attachment.name}`);
          files.push(attachment);

          copyFileSync(
            path,
            __dirname + "/../../../website/public/assets/images/last.png"
          );
        } else {
          embed.setImage(adicional[1].thumbnail);
        }

        return msg.edit({
          content: `:headphones: Tocando agora: \`${adicional[1].name}\``,
          embeds: [embed],
          files: files,
        });
      }
    );
  }
};
