/**
 * LikeFoto
 *
 * @description :: Server-side logic for managing likes on Fotos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    
    upvote: async function(req, res){
        isLiked = await FotoAvaliadaPor.findOne({
            id_utilizador: req.param('id_user'),
            id: req.param('id_foto')
            });
            FotoAvaliadaPor.findOrCreate({ id_utilizador: req.param('id_user'), id: req.param('id_foto')}, { id_utilizador: req.param('id_user'), id: req.param('id_foto'), is_liked: req.param('is_liked')})
        .exec(async(err, user, wasCreated)=> {
            if (err) { return res.serverError(err); }
        
            if(wasCreated) {
                return res.ok();
            }
            else {
                return res.badRequest(
                    'A foto já foi avaliada anteriormente.'
                  );
            }
        });
    }
};