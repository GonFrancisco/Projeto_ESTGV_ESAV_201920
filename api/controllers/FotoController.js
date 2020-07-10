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
        var val = 0;
        if(req.param('val') == 1)
          val = 1;
        console.log(req.param('val'))
        console.log(val)
        data = {
            id_especie: id,
            nome_ficheiro: nome,
            adicionada_por: user,
            is_validated: val,
        };
        Foto.create(data).fetch().exec(function(err, user){
            if (err) { return res.serverError(err); }
            return res.ok();
        });
      },

    getCapa: async function(especie, req, res){
        const foto = await Foto.find({
            id_especie: especie,
            foto_capa: 1,
            is_validated: 1
          });
        const more = await Foto.find({
            id_especie: especie,
            foto_capa: 0,
            is_validated: 1
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
    },

    getEveryImage: async function(req, res){
        const imgs = await Foto.find({
            where: {id_especie: req.param('data'), is_validated: 1},
            select: ['nome_ficheiro']
        });
        return res.send(imgs);
    },

    openTabela: async function(req, res){
        var colunas = ['ID', 'Espécie', 'Nome do ficheiro', 'Foto de capa', 'Adicionada por', 'Avaliação', 'Imagem'];


        return res.view('pages/dashboard/tabelas/imagens', {
            layout: 'layouts/dashboard',
            colunas: colunas
        });
    },

    openTabelaToValidate: async function(req, res){
        var colunas = ['ID', 'Espécie', 'Nome do ficheiro', 'Adicionada por', 'Imagem'];

        return res.view('pages/dashboard/tabelas/validar_imagens', {
            layout: 'layouts/dashboard',
            colunas: colunas
        });
    },

    toJSON: async function(req, res){
        result = await Foto.find({
            is_validated: 1
            }).populate('id_especie');
            if (result.length > 0) {
                //console.log(JSON.stringify(result));
                await result.forEach(element => element.link = element.id_especie.genero + '_' + element.id_especie.nome + '_' + element.id_especie.sub_especie + '/' + element.nome_ficheiro);
                await result.forEach(element => element.id_especie = element.id_especie.genero + ' ' + element.id_especie.nome + ' ' + element.id_especie.sub_especie);
                await result.forEach(element => element.foto_capa = (element.foto_capa ? 'Sim' : 'Não'));
                return res.json(result);
        }
    },

    toJSONToValidate: async function(req, res){
        result = await Foto.find({
            is_validated: 0
            }).populate('id_especie');
            if (result.length > 0) {
                await result.forEach(element => element.link = element.id_especie.genero + '_' + element.id_especie.nome + '_' + element.id_especie.sub_especie + '/' + element.nome_ficheiro);
                await result.forEach(element => element.id_especie = element.id_especie.genero + ' ' + element.id_especie.nome + ' ' + element.id_especie.sub_especie);
                //console.log(JSON.stringify(result));
                return res.json(result);
        }
    },

    apagar: async function(req, res){
        var del = await Foto.destroyOne({id: req.param('id')})
            if (del) {
                return res.ok();
            } else {
                return res.serverError();
            }
    },

    validate: async function(req, res){
        await Foto.updateOne({ id:req.param('id') })
        .set({
            is_validated: 1,
        });
        return res.ok();
    }

};