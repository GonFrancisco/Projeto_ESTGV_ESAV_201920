/**
 * Novos Termos
 *
 * @description :: Server-side logic for managing the new terms db
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    addTerm: async function(termo, req, res){
        var _termo = termo;
        if(Array.isArray(_termo))
            _termo = _termo.join(' ');
        _termo = _termo.toLowerCase();
        //console.log(_termo);
        NovosTermos.findOrCreate({ id: _termo }, { id: _termo })
        .exec(async(err, row, wasCreated)=> {
          if (err) { /*console.log(err);*/ }
            //console.log(row.id);
          if(row) {
            isupdated = await NovosTermos.updateOne({ id: _termo })
            .set({
                contagem: row.contagem + 1
            });

            if (isupdated) {
                //console.log('Updated ' + row.id);
            }
            else {
                //console.log('The database does not contain a user named "Pen".');
            }
          }
        });
        req.flash('sem_resultado', 'A pesquisa não encontrou nenhum resultado!');
        res.redirect('/');
        
    },

    openTabela: async function(req, res){
        var colunas = ['Termo pesquisado', 'Número de pesquisas'];
        var data = [
            { "data": "id" },
            { "data": "contagem" }
        ]

        return res.view('pages/dashboard/tabela', {
            layout: 'layouts/dashboard',
            colunas: colunas,
            nome: 'novostermos',
            data: data,
            title: 'Novos Termos',
            familias: 'undefined',
            ordens: 'undefined'
        });
    },

    toJSON: async function(req, res){
        result = await NovosTermos.find({
            select: ['id', 'contagem']
            });
            if (result.length > 0) {
                //console.log(JSON.stringify(result));
            return res.json(result);
        }
    }
    
 };