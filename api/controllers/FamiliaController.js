/**
 * Familia
 *
 * @description :: Server-side logic for managing Familia
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

    openTabela: async function(req, res){
        var colunas = ['Familia', 'Ordem', 'Link Wikipedia'];
        var data = [
            { "data": "id" },
            { "data": "ordem" },
            { "data": "wiki_link" }
        ]

        ordens = await Ordem.find({
            select: ['id']
          }).sort('id ASC');

        return res.view('pages/dashboard/tabela', {
            layout: 'layouts/dashboard',
            colunas: colunas,
            nome: 'familias',
            data: data,
            title: 'Familias',
            familias: 'undefined',
            ordens: ordens
        });
    },

    toJSON: async function(req, res){
        result = await Familia.find({
            select: ['ordem', 'wiki_link']
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
          ordem: req.param('ordem'),
          wiki_link: req.param('wiki')
        };
    
        Familia.create(data).fetch().exec(function(err, user){
            if (err) { return res.serverError(err); }
            return res.ok();
        });
      },
    
      edit: async function(req, res){
        
    
        var updatedFamilia = await Familia.updateOne({ id:req.param('id') })
        .set({
            id: req.param('nome'),
            ordem: req.param('ordem'),
            wiki_link: req.param('wiki'),
        });
        // console.log(req.param('id'));
        // console.log(req.param('nome'));
        if (updatedFamilia) {
            return res.ok();
          }
          else {
            return res.serverError();
          }
      },
    
      apagar: async function(req, res){
        var del = await Familia.destroyOne({id: req.param('id')})
            if (del) {
                return res.ok();
            } else {
                return res.serverError();
            }
      }
};