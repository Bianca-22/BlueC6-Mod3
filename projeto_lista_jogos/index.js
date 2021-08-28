const express = require("express");
const jogoSchema = require("./models/jogos");
const mongoose = require("./database/index");
const app = express();
app.use(express.json());
const port = 3000;



app.get('/', (req, res) => {
    res.send({ info: 'Lista de Jogos'})
});

app.get('/jogos', async (req, res) => {
    const jogos = await jogoSchema.find();
    res.send({jogos})
});

app.get('/jogos/:id', async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(422).send({error: 'Id inválido'})
        return;
    };

    const jogo = await jogoSchema.findById(id);

    if (!jogo){
        res.status(404).send({error: 'Jogo não encontrado!'})
        return;
    };

    res.send({jogo})
});

app.post('/jogos',async (req, res) => {
    const jogo = req.body;

    if(!jogo || !jogo.nome || !jogo.imageUrl){
        res.status(400).send({ error: "Insira todos os campos."});
        return;
    };

    const jogoNovo = await new jogoSchema(jogo).save();

    res.status(201).send({jogoNovo})
});

app.put('/jogos/:id', async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(422).send({error: 'Id inválido'})
        return;
    };

    const jogo = await jogoSchema.findById(id);

    if (!jogo){
        res.status(404).send({error: 'Jogo não encontrado!'})
        return;
    };

    const jogoNovo = req.body;

    if(!jogoNovo || !jogoNovo.nome || !jogoNovo.imageUrl){
        res.status(400).send({ error: "Insira todos os campos."});
        return;
    };

    await jogoSchema.findOneAndUpdate({_id: id}, jogoNovo);
    const jogoAtualizado = await jogoSchema.findById(id);

    res.send({jogoAtualizado})
});

app.delete("/jogos/:id", async (req, res) => {
    const id = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(422).send({ error: "Id inválido" });
        return;
    };
  
    const jogo = await jogoSchema.findById(id);
  
    if (!jogo) {
        res.status(404).send({ error: "Jogo não encontrado!" });
        return;
    };
  
    await jogoSchema.findByIdAndDelete(id);
    res.send({message: 'Filme excluído com sucesso!'})
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

