const express = require("express");
const morgan = require('morgan');
const chalk = require('chalk');
const app = express();
const port = 8000;
const categoriaRota = require('./controllers/categoria/router');


app.use(express.json());

app.get("/", (req, res) => {
    res.send("Pagina inicial");
});

const morganMiddleware = morgan(function (tokens, req, res) {
    return [
        '\n\n\n',
        chalk.red(tokens.method(req, res)),
        chalk.green(tokens.url(req, res)),
        chalk.yellow(tokens['response-time'](req, res) + ' ms'),
        '\n\n\n',
    ].join(' ');
});

app.use(morganMiddleware);

app.use('/', categoriaRota);

// app.use('/', produtoRota);

// app.use('/', usuarioRota);

// app.use('/', carrinhoRota);

// app.use('/', comentarioRota);

app.use((req, res) => {
    res.status(404).send("Rota não encontrada")
});

app.listen(port, () => {
    console.log(`Rodando no link http://localhost:${port}`);
});