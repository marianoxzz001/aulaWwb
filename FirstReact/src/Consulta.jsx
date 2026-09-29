import { useState, useEffect } from "react";
import axios from "axios";
import Tabela from './Tabela'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';

export default function Consulta() {
    const [busca, setBusca] = useState('');
    const [resultado, setResultado] = useState(null);
    const [erro, setErro] = useState('');
    const [todos, setTodos] = useState([])

    useEffect(() => {
        async function buscarTodos() {
            try {
                const response = await axios.get("http://localhost:9001/api/fornecedor/");
                setTodos(response.data);
            } catch (error) {
                setErro('Fornecedores não encontrados')
            }
        }

        buscarTodos()
    }),
        [

        ]

    async function Consulta() {
        setErro('');
        setResultado(null);

        try {
            const response = await axios.get(`http://localhost:9001/api/fornecedor/${busca}`);
            setResultado(response.data);
        } catch (error) {
            setErro("Fornecedor não encontrado");
        }
    }


    function Limpar() {
        setResultado(null);
        setBusca('');
        setErro('');
    }

    const enviar = () => {
        if (!busca.trim()) {
            setErro("Digite algum valor");
            return;
        }
        Consulta();
    }

    return (
        <div>
            {!resultado && (
                <div>
                    <TextField id="standard-basic" label="Digite o id" variant="standard" value={busca} onChange={(event) => { setBusca(event.target.value); setErro("") }} />
                    <IconButton aria-label="fingerprint" color="success" onClick={enviar}>
                        <Fingerprint />
                    </IconButton>
                    <Tabela todos={todos} />
                </div>
            )}

            {erro && (
                <div>
                    <p>{erro}</p>
                    <button onClick={Limpar}>Limpar</button>
                </div>
            )}

            {resultado && (
                <div>
                    <p>Id: {resultado.id}</p>
                    <p>Nome: {resultado.nome}</p>
                    <p>Email: {resultado.email}</p>
                    <p>Telefone: {resultado.telefone}</p>
                    <p>Endereco: {resultado.endereco}</p>
                    <button onClick={Limpar}>Limpar</button>
                </div>
            )}
        </div>)
}
