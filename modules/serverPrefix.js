const database = require("local-db-express");
const ConfigsFile = "../configs/config.json";

const DB_collection = "servers";

/*
    Simples, o bot verifica se tem um prefixo diferente salvo e se tiver ele retorna o prefixo custumizado,
    caso ao contrario ele retorna o prefixo padrão encontrado em "../../configs/config.json" L16 do código abaixo

    Usando uma db feita por mim mesmo! um jeito de salvar valores de um jeito fácil.
*/

exports.getPrefix = async (message) => {
  if (!message || !message.guild)
    throw new Error(
      "Não foi possivel identificar o servidor. Porfavor tente enviar a message junto EX: 'getPrefix(message)'.",
    );

  const collection = await database.collection.exists(DB_collection);
  if (!collection.exists) {
    await database.collection.create(DB_collection);
  }

  const guild = message.guild.id;
  const exists = await collection.docExists(guild);
  if (exists) {
    let r = await collection.get(guild);
    RESULT = r.document;
  } else {
    RESULT = require(ConfigsFile).defaultPrefix;
  }
  return RESULT;
};
