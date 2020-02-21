/**
 * Foto
 *
 * @description :: Server-side logic for managing Foto
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

    toJSON: async function(req, res){
        result = await Foto.find({
            
          });
          if (result.length > 0) {
              //console.log(JSON.stringify(result));
            return res.json(result);
        }
    },

    addFoto: async function(req, res) {

        var especie = req.param('especie');
        var id = req.param('id');
        var path = '../../assets/images/galeria/especies/' + especie + '/';
    
        var nome = especie + new Date().getTime().toString() + '.jpg';
    
        console.log(nome)
    
        req.file('foto').upload({dirname: path, saveAs: function (__newFileStream, next) { return next(undefined, nome); }},function (err, uploadedFiles){
          if (err) return res.serverError(err);
          console.log(uploadedFiles.length + ' jpg(s) uploaded successfully!');
          });
        
        var user = 1;
        if(req.user != undefined)
          user = req.user.id;
        data = {
            id_especie: id,
            nome_ficheiro: nome,
            adicionada_por: user,
        };
        Foto.create(data).fetch().exec(function(err, user){
            if (err) { return res.serverError(err); }
            return res.ok();
        });
      },

    getCapa: async function(especie, req, res){
        const foto = await Foto.find({
            id_especie: especie,
            foto_capa: 1
          });
        const more = await Foto.find({
            id_especie: especie,
            foto_capa: 0
        })

        var ret = [];
        if (foto.length > 0) {
            //console.log(JSON.stringify(result));
            ret.push(foto[0].nome_ficheiro);
        } else {
            ret.push('semfotos.jpg');
        }
        if (more.length > 0) {
            //console.log(JSON.stringify(result));
            ret.push(more[0].nome_ficheiro);
        } else {
            ret.push('semfotos.jpg');
            ret.push('semfotos.jpg');
        }
        if (more.length > 1){
            ret.push(more[1].nome_ficheiro);
        }
        else {
            ret.push('semfotos.jpg');
        }
        return ret;
    }

};