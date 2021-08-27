const mongoose = require("../database/index");

const jogoSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
});

const Jogo = mongoose.model("Jogo", jogoSchema);

module.exports = Jogo;