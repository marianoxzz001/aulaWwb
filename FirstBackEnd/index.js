const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORTA = 9001;

const produtoRouter = require('./routesProduto');
const fornecedorRouter = require('./routesFornecedor');

app.listen(PORTA, () =>{
    console.log(`Servido rodando na porta ${PORTA}`);
})

app.use('/api/produtos', produtoRouter);
app.use('/api/fornecedor', fornecedorRouter);