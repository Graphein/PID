const DoadorModel = require('../model/DoadorModel.js')

class DoadorController{
    async inserir(req,res){
        try {
            const {nome, email, dataNascimento, telefone, cpf, genero, endereco, numero, cidade, estado} = req.body;

            const doadorData = {nome, email, dataNascimento, telefone, cpf, genero, endereco, numero, cidade, estado};
            const doador = await DoadorModel.criar(doadorData);
            res.status(201).json({
                message: 'Doador inserido com sucesso',
                data:doador.toJSON()
            });
        } catch (error) {
            res.status(500).json({
                error:error.message
            });
        }
    }

    async buscarPorFiltro(req,res){
        try {
            const {termo} = req.query;
            const doadores = await DoadorModel.buscaPorfiltro(termo);
            doadores.map(doar => {
                console.log(doar.toJSON())
            })

            if(doadores.length === 0){
                return res.status(404).json({
                    message:'Nenhum doador encontrada',
            });
        }
        res.status(200).json({
            message: 'Doadores encontrados',
            data: doadores.map(doador=>doador.toJSON()),
        });

        }catch(error){
            console.error('Erro ao buscar doadores por filtro:', error);
            res.status(500).json({
                message: 'Erro ao buscar doadores por filtro',
                error: error.message,
            });
        }
    }

    async buscarPorId(req,res){
        try {
            const { id } = req.params;
            const doador = await DoadorModel.buscaPorId(id);

            if(!doador){
                return res.status(404).json({
                    message: 'Doador não encontrado',
                });
            }

            res.status(200).json({
                message: 'Doador encontrado',
                data: doador.toJSON(),
            });
        } catch (error) {
            console.error('Erro ao buscar doador por ID', error);
            res.status(500).json({
                message: 'Erro ao buscar doador por ID',
                error: error.message,
            });
        }
    }

    async deletar(req,res){
        try {
            const { id } = req.params;
            const doador = await DoadorModel.buscaPorId(id);

            if(!doador) {
                return res.status(404).json({
                    message: 'Doador não encontrada',
                });
            }

            await doador.deletar();

            res.status(200).json({
                message: 'Doador excluida com sucesso',
            });
            
        } catch (error) {
            console.error('Erro ao excluir doador:', error);
            res.status(500).json({
                message: 'Erro ao excluir doador',
                error: error.message,
            });
        }
    }

    async atualizar(req,res){
        try {
            const { id } = req.params;
            const { nome, email, dataNascimento, telefone, cpf, genero, endereco, numero, cidade, estado } = req.body;

            const doador = await DoadorModel.buscaPorId(id);
            const cpfExist =await DoadorModel.buscaPorCpf(cpf);
        
            if(cpfExist!=null && doador.cpf!=cpf){
                return res.status(400).json({
                    message: 'CPF ja cadastrado',
                })
            }

            if(!doador) {
                return res.status(404).json({
                    message: 'Doador não encontrada',
                });
            }

            doador.nome = nome;
            doador.email = email;
            doador.dataNascimento = dataNascimento;
            doador.telefone = telefone;
            doador.cpf = cpf;
            doador.genero = genero;
            doador.endereco = endereco;
            doador.numero = numero;
            doador.cidade = cidade;
            doador.estado = estado;
            console.log(doador.cpf)
            
            await doador.atualizar();

            res.status(200).json({
                message: 'Doador atualizada com sucesso',
                data: doador.toJSON(),
            });

        } catch (error) {
            console.error('Erro ao atualizar doador:', error),
            res.status(500).json({
                message: 'Erro ao atualizar doador',
                error: error.message,
            });
        }
    }

}

module.exports = new DoadorController();