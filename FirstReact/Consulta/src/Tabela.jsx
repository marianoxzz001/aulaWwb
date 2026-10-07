export default function MostraTabela({todos}) {

    return (
        <div>
            {todos && (
                <div>
                    <table >
                        <tr>
                            <th>ID</th>
                            <th>NOME</th>
                        </tr>
                        {todos.map((fornecedor) => (
                            <tr key={fornecedor.id}>
                                <td>{fornecedor.id}</td>
                                <td>{fornecedor.nome}</td>
                            </tr>
                        ))}
                    </table>

                </div>
            )}

        </div>);
}