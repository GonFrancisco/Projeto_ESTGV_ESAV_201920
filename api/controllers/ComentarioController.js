/**
 * Comentario
 *
 * @description :: Server-side logic for managing Comentario
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    
    add: async function(req, res){
        //console.log(req);
        last = await Comentario.find({
            where: {id_especie: req.param('id_especie')},
            select: ['num_comentario'],
            limit: 1,
            sort: 'num_comentario DESC'
        });
        var nc = 1;
        //console.log(req.param('reply_to'));
        //console.log(last);
        if(last.length == 1) 
            nc = last[0].num_comentario + 1;
        //console.log(nc);
        //if(req.param('reply_to') == -1){
            
            await Comentario.create({
                id_especie: req.param('id_especie'),
                num_comentario: nc,
                data_hora: new Date().toISOString().slice(0, 19).replace('T', ' '),
                id_utilizador: req.param('user_id'),
                comentario: req.param('comentario'),
                resposta_a: req.param('reply_to')
            }).intercept((err)=>{
                return err;
               });
        //} else {
            //await Comentario.create({
                //id_especie: req.param('id_especie'),
                //num_comentario: nc,
                //data_hora: new Date().toISOString().slice(0, 19).replace('T', ' '),
                //id_utilizador: req.param('user_id'),
                //comentario: req.param('comentario'),
                //resposta_a: req.param('reply_to')
            //}).intercept((err)=>{
                // Return a modified error here (or a special exit signal)
                // and .create() will throw that instead
                //err.message = 'Uh oh: ' + err.message;
                //return err;
               //});
        //}
        return res.ok();
    },

    getByEspecie: async function(req, res){

        result = await Comentario.find({
            id_especie: req.param('id_especie')
        }).populate('id_utilizador');
        for(comentario of result){
            comentario.data_hora = await sails.helpers.tdateTostring(comentario.data_hora);
            //comentario.data_hora = comentario.data_hora.toISOString().slice(0, 16).replace('T', ' ');
        }
        return res.json(result);
    }
    
};