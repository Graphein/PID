const API_BASE_URL="http://localhost:3000"

class DoadorService{

    async buscarDoadores(){
        const response = await fetch(`${API_BASE_URL}/doador`, {
            headers:{
                'Content-Type': 'application/json',
            },
            method: 'GET',
        }
        )
        if(!response.ok){
            console.log('Algo deu errado')
        }
        const dados = await response.json();
        return dados;
    }

    async buscarPorId(id){
        const response = await fetch(`${API_BASE_URL}/doador/${id}`, {
            headers:{
                'Content-Type': 'application/json',
            },
            method: 'GET',
        }
        )
        if(!response.ok){
            console.log('Algo deu errado')
        }
        const dados = await response.json();
        return dados;
    }

    async delete(id){
        const response = await fetch(`${API_BASE_URL}/doador/${id}`, {
            headers:{
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
        }
        )
        if(!response.ok){
            console.error('Erro ao excluir doador');
            alert('Ocorreu um erro ao excluir o doador');
        }else{
            alert('Doador excluído com sucesso!');
        }
    }

    async inserir(doador){
        const doadorJson = JSON.stringify(doador);
        const response = await fetch(`${API_BASE_URL}/doador`, {
            headers:{
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: doadorJson,
        }
        )
        if(!response.ok){
            console.error('Erro ao inserir doador');
            alert('Ocorreu um erro ao inserir o doador');
        }else{
            alert('Doador inserido com sucesso!');
        }
    }


    async alterar(id, doador){
        const doadorJson = JSON.stringify(doador);
        const response = await fetch(`${API_BASE_URL}/doador/${id}`, {
            headers:{
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: doadorJson,
        }
        )
        if(!response.ok){
            console.error('Erro ao editar doador');
            alert('Ocorreu um erro ao editar o doador');
        }else{
            alert('Doador alterado com sucesso!');
        }
    }
}

export default DoadorService