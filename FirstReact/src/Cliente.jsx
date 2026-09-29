import {useState} from 'react'
import Replica from './Replica';

export default function Cliente(){

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [email, setEmail] = useState('');
    const [exibir, setExibir] = useState(false);

    return(
        <div>
            <h2>Cliente</h2>
            <label>id:</label>
            <input value={id} onChange={(event) => setId(event.target.value)}></input><br />
            <label>nome:</label>
            <input value={nome} onChange={(event) => setNome(event.target.value)}></input><br />
            <label>numero:</label>
            <input value={numero} onChange={(event) => setNumero(event.target.value)}></input><br />
            <label>email:</label>
            <input value={email} onChange={(event) => setEmail(event.target.value)}></input><br />

            <button onClick={() => {alert(`${id}, ${nome}, ${numero}, ${email}`)
                setExibir(true);
            }}>
                SEND
            </button>
            {exibir &&(
                <>
                    {id > 0 && <Replica valor={id}/>}
                    {nome.length > 3 && <Replica valor={nome}/>}
                    {numero.length > 8 && <Replica valor={numero}/>}
                    {email.length > 8 && <Replica valor={email}/>}
                </>
            )}
        </div>  
    )
}