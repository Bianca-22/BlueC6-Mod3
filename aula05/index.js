const express = require('express');
const app = express();

app.use(express.json())

const filmes = [
    'Homem Formiga',
    'Capitã Marvel',
    'Pantera Negra'
]

// CRUD - Create[POST] - Read[GET] - Update[PUT] - Delete[DELETE]

// GET / - home
app.get('/', (req, res) => {
    res.send('Hello World');
});

// GET /filmes - lista de filmes
app.get('/filmes', (req, res) => {
    res.send(filmes);
})

// GET /filmes/{id} - Retorna o filme pelo id
app.get('/filmes/:id', (req, res) => {
    const id = req.params.id - 1;
    const filme = filmes[id];

    !filme ?
    res.send('Filme não existe')
    : res.send(filme)
});

// POST - /filmes - Criar um nome filme
app.post('/filmes', (req, res) => {
    const filme = req.body.filme;
    filmes.push(filme);
    res.send('Filme inserido com sucesso!')
});

// PUT - /filmes/{id} - Altera o filme pelo id
app.put('/filme/:id', (req, res) =>{
    const id = +req.params.id;

    const filmeIndex = filmes.findIndex(filme => filme.id === id);

    if (filmeIndex < 0) {
        res.status(404).send({ error : "Filme não encontrado"});
        return;
    };

    const novoFilme = req.body;

    if (!novoFilme || !novoFilme.nome || !novoFilme.duracao) {
        res.status(404).send({ error : "Filme não encontrado"});
        return;
    };
    
    const filme = filmes.
    filmes[id] = filme;
    res.send('Filme alterado com sucesso!')
});

// DELETE - /filmes/{id} - apaga um filme pelo id
app.delete('/filme/:id', (req, res) => {
    const id = req.params.id -1;
    delete filmes[id];
    res.send('Filme deletado com sucesso!')
})

app.listen(3000)

