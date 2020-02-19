/**
 * User
 *
 * @description :: Server-side logic for managing User
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const bcrypt = require('bcrypt');

module.exports = {

    openTabela: async function (req, res) {
        var colunas = ['ID', 'Primeiro Nome', 'Último Nome', 'E-mail', 'Tipo de conta'];
        var data = [
            { "data": "id" },
            { "data": "pnome" },
            { "data": "unome" },
            { "data": "mail" },
            { "data": "isadmin" }
        ]
        return res.view('pages/dashboard/tabela', {
            layout: 'layouts/dashboard',
            colunas: colunas,
            nome: 'utilizadores',
            data: data,
            title: 'Utilizadores',
            ordens: 'undefined',
            familias: 'undefined'
        });
    },

    toJSON: async function (req, res) {
        result = await Utilizador.find({
            select: ['pnome', 'unome', 'mail', 'isadmin']
        });
        if (result.length > 0) {
            for (let res of result)
                if (res.isadmin)
                    res.isadmin = "Administrador"
                else
                    res.isadmin = "Normal"
            //console.log(JSON.stringify(result));
            return res.json(result);
        }
    },

    edit: async function (req, res) {
        isupdated = await Utilizador.updateOne({ id: req.user.id })
            .set({
                pnome: req.param("pnome"),
                unome: req.param("unome"),
                mail: req.param('mail')
            });

        if (isupdated) {
            return res.ok();
        }
        else {
            return res.badRequest();
        }
    },

    update_pw: async function (req, res) {
        var pw = req.param("pw");
        var pwc = req.param("pwc");

        //let tmp = await Utilizador.find(mail: req.param('mail'));

        if(pw != pwc || pw.length < 6 ) return res.badRequest();


        bcrypt.genSalt(10, async function(err, salt){

            bcrypt.hash(pw, salt, async function(err, hash){
                if(err) return res.err();
                pw = hash;

                isupdated = await Utilizador.updateOne({ id: req.user.id })
                .set({
                    hashpw: pw
                });

                if (isupdated) {
                    return res.ok();
                }
                else {
                    return res.badRequest();
                }
            });
        });

        
    },

    uploadAvatar: function (req, res) {
        //console.log('passei aqui')
        var path = '../../assets/images/galeria/utilizadores/' + req.user.mail;
        req.file('avatar').upload({dirname: path, saveAs: function (__newFileStream, next) { return next(undefined, 'avatar.png'); }},function (err, uploadedFiles){
          if (err) return res.serverError(err);
          //console.log(uploadedFiles.length + ' file(s) uploaded successfully!');
          return res.ok();
          });
        
      },

      newUser: function(req, res){
        // TODO: validation of form
        data = {
            //id: req.param('id'),
            pnome: req.param('pnome'),
            unome: req.param('unome'),
            mail: req.param('mail'),
            hashpw: req.param('pw'),
            tipo_conta: req.param('tipo')
        };

        Utilizador.create(data).fetch().exec(function(err, user){
            if (err) { return res.serverError(err); }
            // TODO confirmation email
            fs.mkdir('assets/images/galeria/utilizadores/' + data.mail, 0744, function(err) {
                //if (err) {
                    //if (err.code == 'EEXIST') // console.log(folder_name + ' ja existe'); // ignore the error if the folder already exists
                    //else console.log(folder_name + ' erro inesperado'); // something else went wrong
                //} else console.log(folder_name + ' criada com sucesso'); // successfully created folder
            return res.ok();
            });
        });
    }, 

    apagar: async function(req, res){
        var del = await Utilizador.destroyOne({id: req.param('id')})
            if (del) {
                return res.ok();
            } else {
                return res.serverError();
            }
      }

};
