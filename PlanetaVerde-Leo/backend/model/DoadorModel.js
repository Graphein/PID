const DoadorDAO = require('../DAOs/DoadorDAO.js')

class DoadorModel{
    #id;
    #nome;
    #email;
    #dataNascimento;
    #telefone;
    #cpf;
    #genero;
    #endereco;
    #numero;
    #cidade;
    #estado;

    constructor(id, nome, email, dataNascimento, telefone, cpf, genero, endereco, numero, cidade, estado){
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#dataNascimento = dataNascimento;
        this.#telefone = telefone;
        this.#cpf = cpf;
        this.#genero = genero;
        this.#endereco = endereco;
        this.#numero = numero;
        this.#cidade = cidade;
        this.#estado = estado;
    }

    get id(){
        return this.#id;
    }

    set id(value){
        this.#id=value;
    }

    get nome(){
        return this.#nome;
    }

    set nome(value){
        this.#nome=value;
    }

    get email(){
        return this.#email;
    }

    set email(value){
        this.#email=value;
    }

    get dataNascimento(){
        return this.#dataNascimento;
    }

    set dataNascimento(value){
        this.#dataNascimento=value;
    }

    get telefone(){
        return this.#telefone;
    }

    set telefone(value){
        this.#telefone=value;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(value){
        this.#cpf=value;
    }

    get genero(){
        return this.#genero;
    }

    set genero(value){
        this.#genero=value;
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(value){
        this.#endereco=value;
    }

    get numero(){
        return this.#numero;
    }

    set numero(value){
        this.#numero=value;
    }

    get cidade(){
        return this.#cidade;
    }

    set cidade(value){
        this.#cidade=value;
    }

    get estado(){
        return this.#estado;
    }

    set estado(value){
        this.#estado=value;
    }

    toJSON(){
        return {
            id:this.#id,
            nome:this.#nome,
            email:this.#email,
            dataNascimento:this.#dataNascimento,
            telefone:this.#telefone,
            cpf:this.#cpf,
            genero:this.#genero,
            endereco:this.#endereco,
            numero:this.#numero,
            cidade:this.#cidade,
            estado:this.#estado
        };
    }

    static async criar(doadorData){
        const dao = new DoadorDAO();

        const doador = new DoadorModel(
            null,
            doadorData.nome,
            doadorData.email,
            doadorData.dataNascimento,
            doadorData.telefone,
            doadorData.cpf,
            doadorData.genero,
            doadorData.endereco,
            doadorData.numero,
            doadorData.cidade,
            doadorData.estado

        );
        doador.#id =await dao.inserir(doador);
        return doador;
    }

    static async buscaPorfiltro(termo){
        const dao = new DoadorDAO();
        const rows = await dao.buscarPorTermo(termo);
        return rows.map((row)=>
        new DoadorModel(
            row.id,
            row.nome,
            row.email,
            row.data_nascimento,
            row.telefone,
            row.cpf,
            row.genero,
            row.endereco,
            row.numero,
            row.cidade,
            row.estado
        )
        )

    }

    static async buscaPorId(id){
        const dao = new DoadorDAO();
        const data = await dao.buscarPorId(id);
        if(!data) return null;
        return new DoadorModel(
            data.id,
            data.nome,
            data.email,
            data.data_nascimento,
            data.telefone,
            data.cpf,
            data.genero,
            data.endereco,
            data.numero,
            data.cidade,
            data.estado          
        );
    }

    static async buscaPorCpf(cpf){
        const dao = new DoadorDAO();
        const data = await dao.buscarPorCpf(cpf);
        if(!data) return null;
        return new DoadorModel(
            data.id,
            data.nome,
            data.email,
            data.data_nascimento,
            data.telefone,
            data.cpf,
            data.genero,
            data.endereco,
            data.numero,
            data.cidade,
            data.estado  
        );
    }
    

    async deletar(){
        const dao = new DoadorDAO();
        return await dao.deletar(this.#id);
    }

    async atualizar(){
        const dao = new DoadorDAO();
        return await dao.atualizar(this.#id, this);
    }
}

module.exports=DoadorModel