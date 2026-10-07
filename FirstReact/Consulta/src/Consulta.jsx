import react from 'react'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import './App.css'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Tabela from './Tabela.jsx';




export default function Consulta() {



    const [data, setData] = useState([])
    const [todos, setTodos] = useState(null)
    const [erro, setErro] = useState('')
    const [busca, setBusca] = useState('')





    useEffect(() => {
        async function buscarTodos() {
            try {
                const response = await axios.get("http://localhost:9001/api/fornecedor/");
                setData(response.data);
            } catch (error) {
                setErro('Fornecedores não encontrados')
            }
        }

        buscarTodos()
    }),[]


    async function Consulta() {
        setErro('');
        setTodos(null);

        try {
            const response = await axios.get(`http://localhost:9001/api/fornecedor/${busca}`);
            setTodos(response.data);
        } catch (error) {
            setErro("Fornecedor não encontrado");
        }
    }

    function limpar() {
        setTodos(null);
        setBusca('');
        setErro('');
    }

    return (
        <div>
        {!todos && (<div >
            <h1>Consulta</h1>
            <TextField id="standard-basic" label="Digite o id" variant="standard" value={busca} onChange={(event) => { setBusca(event.target.value); setErro("") }} />

             


        <Button onClick={Consulta} variant="outlined" startIcon={<DeleteIcon />}>
        Buscar</Button>

        <Tabela todos={todos} />
        </div>
    )}


    {erro && (
                <div>
                    <p>{erro}</p>
                </div>)}


        
        {todos && (<div>
            <h1>Resultado</h1>
            <div>
            <p>Id: {todos.id}</p>
            <p>Nome: {todos.nome}</p>
            <p>Email: {todos.email}</p>
            <p>Telefone: {todos.telefone}</p>
            <p>Endereco: {todos.endereco}</p>
            </div>
            <Button onClick={limpar} variant="outlined" startIcon={<SendIcon />}>
        Voltar
      </Button>
        </div>
        )}
    </div>
    )}
