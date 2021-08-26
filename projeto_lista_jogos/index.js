const express = require("express");
const app = express();

app.use(express.json());

const port = 3000;

const jogos = [
    {
        id: 1,
        nome: "League of Legends",
        imageUrl: "https://blog.kabum.com.br/wp-content/uploads/2021/04/Riot-League-of-Legends.jpg"
    },

    {
        id: 2,
        nome: "Call of Duty: Warzone",
        imageUrl: "https://www.gamerpoint.com.br/wp-content/uploads/2021/03/call-of-duty-warzone-atualizacao-tamanho-arquivo--1536x864.jpg"
    }
];

const getJogosValidos = () => jogos.filter(Boolean);
const getJogosById = id => getJogosValidos().find(jogo => jogo.id === id);
const getJogosIndexById = id => getJogosValidos().findIndex(jogo => jogo.id === id);

app.get('/', (req, res) => {
    res.send('Lista de Jogos')
});

app.get('/listaJogos', (req, res) => {
    res.json({jogos})
});

app.get('/listaJogos/:id', (req, res) => {
    const id = +req.params.id;
    const jogo = getJogosById(id)

    !jogo
      ? res.status(404).send({ error: "Jogo não existe" })
      : res.json({ jogo });
});

app.post("/listaJogos", (req, res) => {
    const jogo = req.body;
  
    if (!jogo || !jogo.nome || !jogo.imageUrl) {
      res.status(400).send({ error: "Jogo inválido!" });
      return;
    }

    const ultimoJogo = jogos[jogos.length - 1];

    if (jogos.length) {
      jogo.id = ultimoJogo.id + 1;
      jogos.push(jogo);
    } else {
      jogo.id = 1;
      jogos.push(jogo);
    }
  
    res.status(201).send({ jogo });
});
  
app.put("/listaJogos/:id", (req, res) => {
    const id = +req.params.id;
    const jogoIndex = getJogoIndexById(id)

    if (jogoIndex < 0) {
        res.status(404).send({error: 'Filme não encontrado'})
        return;
    }

    const novoJogo = req.body;

    if (!novoJogo || !novoJogo.nome || !jogo.imageUrl) {
        res.status(400).send({ error: "Preencha todos os campos" });
        return;
    }

    const jogo = getJogosById(id)
    novoJogo.id = jogo.id
    jogos[jogoIndex] = novoJogo

    res.send({message: "Jogo alterado com sucesso!"});
});

app.delete("/listaJogos/:id", (req, res) => {
    const id = +req.params.id;
    const jogoIndex = getJogosIndexById(id);

    if (jogoIndex < 0) {
        res.status(404).send({error: 'Jogo não encontrado'});
        return;
    }

    jogos.splice(jogoIndex, 1)
    res.send("Jogo apagado com sucesso!");
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});