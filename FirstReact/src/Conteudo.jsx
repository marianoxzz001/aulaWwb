import {useState} from "react";
import Replica from './Replica.jsx'

export default function Conteudo() {
    //JS
    const [contador, setContador] = useState(0);
    const [nome, setNome] = useState('');

    return (
    //HTML
        <div>
        <input value={contador}></input>
        <button onClick={() => setContador(contador+1)}>incrementar</button>
        <br />
        <input value={nome} onChange={(event) => setNome(event.target.value)}></input>
        {nome.length > 3 && <Replica valor={nome}/>}
        </div>
    );
}