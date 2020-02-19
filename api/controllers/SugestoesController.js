/**
 * Sugestoes
 *
 * @description :: Server-side logic for managing the new terms db
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    add: async function(req, res){

        try {
            data = {
                nome: req.param('nome'),
                tipo: req.param('tipo'),
                info: req.param('info')
              };
            await Sugestoes.create(data);
        } catch (err) {
            return res.serverError();
        }

        return res.ok();
        
    },

    openTabela: async function(req, res){
        var colunas = ['Id', 'Nome', 'Tipo', 'Informação'];
        var data = [
            { "data": "id" },
            { "data": "nome" },
            { "data": "tipo" },
            { "data": "info" }
        ]

        return res.view('pages/dashboard/tabela', {
            layout: 'layouts/dashboard',
            colunas: colunas,
            nome: 'sugestoes',
            data: data,
            title: 'Sugestões',
            familias: 'undefined',
            ordens: 'undefined'
        });
    },

    toJSON: async function(req, res){
        result = await Sugestoes.find();
            if (result.length > 0) {
                //console.log(JSON.stringify(result));
            return res.json(result);
        }
    }
    
 };