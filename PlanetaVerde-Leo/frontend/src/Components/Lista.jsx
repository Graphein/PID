import { useEffect,useState } from "react"
import { Table,Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns'
import DoadorService from "../services/DoadorService.jsx"


function Lista(){
    const [doadores, setDoadores] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        (async ()=> {
            const storedDoadores = new DoadorService();
            const doadorArma = await storedDoadores.buscarDoadores();
            setDoadores(doadorArma.data);
        })()
    }, [])

    const handleDelete = async (index)=>{
        const confirmDelete = window.confirm("Deseja confirmar a exclusao do doador?");

        if(confirmDelete){
            const doadorEx = new DoadorService();
            await doadorEx.delete(index)
        }
    }

    const handleEditar = async (index)=>{
        localStorage.setItem('doadores', index);
        navigate('/')
    }

    return <>
        <h2>Doadores</h2>

        <Table striped bordered hover>
           <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Cpf</th>
                    <th>Genero</th>
                    <th>Data de Nascimento</th>
                    <th>Telefone</th>
                    <th>Endereco</th>
                </tr>
            </thead> 
            <tbody>
                {
                    doadores.length>0 ? (
                        <>
                            {doadores.map((doador) => (
                            <tr key={doador.id}>
                                <td>{doador.id}</td>
                                <td>{doador.nome}</td>
                                <td>{doador.email}</td>
                                <td>{doador.cpf}</td>
                                <td>{doador.genero}</td>
                                <td>{format(doador.dataNascimento, 'dd/MM/yyyy')}</td>
                                <td>{doador.telefone}</td>
                                <td>{doador.endereco && (`${doador.endereco}${doador.numero ? `, nº: ${doador.numero}` : ''}${doador.cidade ? `, ${doador.cidade}` : ''}${doador.estado ? `/${doador.estado}` : ''}`
                                )}</td>
                                <td>
                                    <Button variant="primary" className="me-1" onClick={()=>handleEditar(doador.id)}>Editar</Button>
                                    <Button variant="danger" onClick={()=>handleDelete(doador.id)}>Excluir</Button>
                                </td>
                            </tr>
                            ))}
                        </>
                    ):(
                        <span>Não ha doadores</span>
                    )
                    
                }
            </tbody>
        </Table>
    </>
}

export default Lista;