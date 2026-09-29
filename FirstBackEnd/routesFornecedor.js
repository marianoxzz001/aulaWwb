const database = require("./database");
const express = require('express');
const router = express.Router()

router.get('/', (req, res) =>{
    res.status(200).json(database.fornecedores);
})

router.get('/:id', (req, res)=>{
    const id = Number(req.params.id);
    const forn = database.fornecedores.find(f => f.id === id);

    if(!forn){
        res.status(404).json({erro: 'Fornecedor não encontrado'})
    }

    res.status(200).json(forn);
})

router.post('/', (req, res) =>{
    const{ id, nome, email, telefone, endereco} = req.body;
    if(id === undefined || !nome || !email || telefone === undefined || !endereco){
        return res.status(400).json({erro: "Valor informado esta incorreto ou não existe"})
    }

    const proxId = Math.max(...database.fornecedores.map(f => f.id)) + 1;
    const novoFornecedor = {id: Number(proxId), nome, email, telefone: Number(telefone), endereco};

    database.fornecedores.push(novoFornecedor);
    res.status(200).json(novoFornecedor);
})

router.put('/:id', (req, res) =>{
    const id = req.params.id;
    const {nome, email, telefone, endereco} = req.body;

    const fornecedor = database.fornecedor.find(f => f.id === Number(id));

    if(!fornecedor){
        return res.status(404).json({erro: "Id não encontrado"});
    }
    if(nome && email && telefone !== undefined && endereco !== undefined){
        return res.status(400).status({erro: "Alguns valores não foram declarados"});
    }

    fornecedor.nome = nome;
    fornecedor.email = email;
    fornecedor.telefone = Number(telefone);
    fornecedor.endereco = Number(endereco);

    res.json({mensagem: "Fornecedor totalmente atualizado", fornecedor});
})

router.delete('/:id', (req, res) =>{
    const id = req.params;
    const existe = database.fornecedores.findIndex(f => f.id === Number(id));
    if(existe === -1){
        return res.status(404).json({erro: "id não encontrado"});
    }

    database.fornecedores.splice(existe, 1);
    res.status(204).send();
})


module.exports = router;