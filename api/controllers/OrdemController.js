/**
 * Ordem
 *
 * @description :: Server-side logic for managing Ordem
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    /*divisao varchar(16),
    subdivisao varchar(16),
    classe varchar(16),
    subclasse varchar(16),
    nome varchar(16) PRIMARY KEY,
    wiki_link varchar(64)*/
    openTabela: async function(req, res){
        var colunas = ['Ordem', 'Divisão', 'Sub Divisão', 'Classe', 'Sub Classe', 'Link Wikipedia'];
        var data = [
            { "data": "id" },
            { "data": "divisao" },
            { "data": "subdivisao" },
            { "data": "classe" },
            { "data": "subclasse" },
            { "data": "wiki_link"}
        ]
        return res.view('pages/dashboard/tabela', {
            layout: 'layouts/dashboard',
            colunas: colunas,
            nome: 'ordens',
            data: data,
            title: 'Ordens',
            familias: 'undefined',
            ordens: 'undefined'
        });
    },

    toJSON: async function(req, res){
        result = await Ordem.find({
            select: ['divisao', 'subdivisao', 'classe', 'subclasse', 'wiki_link']
            });
            if (result.length > 0) {
                //console.log(JSON.stringify(result));
            return res.json(result);
        }
    },

    addNew: async function(req, res){
    
        //console.log(req.param('nome'));
        data = {
          id: req.param('nome'),
          divisao: req.param('divisao'),
          subdivisao: req.param('subdivisao'),
          classe: req.param('classe'),
          subclasse: req.param('subclasse'),
          wiki_link: req.param('wiki')
        };
    
        Ordem.create(data).fetch().exec(function(err, user){
            if (err) { return res.serverError(err); }
            return res.ok();
        });
      },
    
      edit: async function(req, res){
        
    
        var updatedOrdem = await Ordem.updateOne({ id:req.param('id') })
        .set({
            id: req.param('nome'),
            divisao: req.param('divisao'),
            subdivisao: req.param('subdivisao'),
            classe: req.param('classe'),
            subclasse: req.param('subclasse'),
            wiki_link: req.param('wiki')
        });
        //console.log(req.param('id'));
        //console.log(req.param('nome'));
        if (updatedOrdem) {
            return res.ok();
          }
          else {
            return res.serverError();
          }
      },
    
      apagar: async function(req, res){
        var del = await Ordem.destroyOne({id: req.param('id')})
            if (del) {
                return res.ok();
            } else {
                return res.serverError();
            }
      }
};