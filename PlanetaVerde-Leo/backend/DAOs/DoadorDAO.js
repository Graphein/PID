const db = require('../config/db.js')

class DoadorDAO{

    async inserir(doador){
        const {nome, email, dataNascimento, telefone, cpf, genero, endereco, numero, cidade, estado} = doador;
        const query = `INSERT INTO doadores (nome, email, data_nascimento, telefone, cpf, genero, endereco, numero, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await db.execute(query, [nome, email, dataNascimento, telefone, cpf, genero, endereco, numero, cidade, estado]);
        console.log(result);
        return result.insertId;
    }

    async buscarPorTermo(termo){
        
        if(!termo || termo.trim() === ''){
            const query = `SELECT * FROM doadores`;
            const [rows] = await db.execute(query);
            return rows;
        }else{
            const query = `SELECT * FROM doadores WHERE nome LIKE ? OR cpf LIKE ?`;
            const [rows] = await db.execute(query, [`%${termo}%`, `%${termo}%`]);
            return rows;
        }
            
    }

    async buscarPorId(id){
        const query = 'SELECT * FROM doadores WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    }

    async buscarPorCpf(cpf){
        const query = 'SELECT * FROM doadores WHERE cpf = ?';
        const [rows] = await db.execute(query, [cpf]);
        return rows[0];
    }

    async deletar(id){
        const query = 'DELETE FROM doadores WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }

    async atualizar(id, doador){
        const {nome, email, dataNascimento, telefone, cpf, genero, endereco, numero, cidade, estado} = doador;
        const query = `UPDATE doadores SET nome = ?, email = ?, data_nascimento= ?, telefone = ?, cpf = ?, genero = ?, endereco = ?, numero = ?, cidade = ?, estado = ? WHERE id = ?`
        try {
            const [result] = await db.execute(query, [nome, email, dataNascimento, telefone, cpf, genero, endereco, numero, cidade, estado, id]);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=DoadorDAO