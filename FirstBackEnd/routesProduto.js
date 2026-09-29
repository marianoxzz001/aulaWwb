const database = require("./database");
const express = require('express');
const router = express.Router()

router.get("/:id", (req, res) =>{
    const id = Number(req.params.id);
    const prod = database.produtos.find(p => p.id === id);
    if(!prod){
        return res.status(404).json({erro: "Produto não encontrado"});
    }
    res.status(200).json(prod);
})

// GET /api/produtos
// GET /api/produtos?descricao=descricao1
// GET /api/produtos?nome=Produto+1
// GET /api/produtos?id_fornecedor=1
// GET /api/produtos?nome=Produto+1&id_fornecedor=1  (combinando os dois)
router.get("/", (req, res) =>{
    const {nome, descricao, preco, estoque, fornecedor_id} = req.query;
    let result = database.produtos;

    if(nome){
        result = result.filter(p => p.nome === nome);
    }
    if(descricao){
        result = result.filter(p => p.descricao === descricao);
    }
    if(preco){
        result = result.filter(p => p.preco === Number(preco));
    }
    if(estoque){
        result = result.filter(p => p.estoque === Number(estoque));
    }
    if(fornecedor_id){
        result = result.filter(p => p.fornecedor_id === Number(fornecedor_id));
    }
    const algumFiltroUsado = nome || descricao || preco || estoque || fornecedor_id;
    if(algumFiltroUsado && result.lenght === 0){
        return res.status(404).json({erro: "Nenhum valor correspondente encontrado"});
    }

    res.status(200).json(result);
})

router.post("/", (req, res) =>{
    const {nome, descricao, preco, estoque, fornecedor_id} = req.body;
    if(!nome || !descricao || preco === undefined || estoque === undefined || fornecedor_id === undefined){
        return res.status(400).json({erro: "Campos obrigatórios faltando"});
    }
    const fornecedorExite = database.fornecedores.find(f => f.id === Number(fornecedor_id));
    if(!fornecedorExite){
        return res.status(404).json({ erro: "Fornecedor não encontrado" });
    }

    let proximoIdProduto = Math.max(...database.produtos.map(p => p.id)) + 1;

    const newProduct = {
        id: proximoIdProduto++,
        nome,
        descricao,
        preco: Number(preco),
        estoque: Number(estoque),
        fornecedor_id: Number(fornecedor_id),
    }

    database.produtos.push(newProduct);
    res.status(201).json(newProduct);
})

router.put("/:id", (req, res) =>{
    const id = req.params.id;
    const {nome, descricao, preco, estoque, fornecedor_id} = req.body;

    let produto = database.produtos.find(p => p.id === Number(id));

    if(!produto){
        return res.status(404).json({erro: "Usuario não encontrado"});
    }

    const todosRegistrados = nome && descricao && preco!==undefined && estoque!==undefined && fornecedor_id!==undefined;

    if(!todosRegistrados){
        return res.status(400).json({erro: "o PUT exige que todos os valores sejam preenchidos"});
    }

    produto.nome = nome
    produto.descricao = descricao;
    produto.preco = Number(preco);
    produto.estoque = Number(estoque);
    produto.fornecedor_id = Number(fornecedor_id);

    res.json({ mensagem: "Produto totalmente atualizado", produto});

})

router.delete("/:id", (req, res) =>{
    const {id} = req.params;
    const existe = database.produtos.findIndex(p => p.id === Number(id));
    if(existe === -1){
        return res.status(404).json({erro: "Id não encontrado"});
    }

    database.produtos.splice(existe, 1)
    res.status(204).send();
})

module.exports = router;