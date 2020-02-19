/**
 * Gene
 *
 * @description :: Server-side logic for managing Gene
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    
    openTabela: async function(req, res){
        var colunas = ['Género', 'Família', 'Link Wikipedia'];
        var data = [
            { "data": "id" },
            { "data": "familia" },
            { "data": "wiki_link" }
        ]
        familias = await Familia.find({
            select: ['id']
          }).sort('id ASC');

        return res.view('pages/dashboard/tabela', {
            layout: 'layouts/dashboard',
            colunas: colunas,
            nome: 'generos',
            data: data,
            title: 'Géneros',
            familias: familias,
            ordens: 'undefined'
        });
    },

    toJSON: async function(req, res){
        result = await Genero.find({
            select: ['familia', 'wiki_link']
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
          familia: req.param('familia'),
          wiki_link: req.param('wiki')
        };
    
        Genero.create(data).fetch().exec(function(err, user){
            if (err) { return res.serverError(err); }
            return res.ok();
        });
      },
    
      edit: async function(req, res){
        
    
        var updatedGenero = await Genero.updateOne({ id:req.param('id') })
        .set({
            id: req.param('nome'),
            familia: req.param('familia'),
            wiki_link: req.param('wiki'),
        });
    
        if (updatedGenero) {
            return res.ok();
          }
          else {
            return res.serverError();
          }
      },
    
      apagar: async function(req, res){
        var del = await Genero.destroyOne({id: req.param('id')})
            if (del) {
                return res.ok();
            } else {
                return res.serverError();
            }
      }
};