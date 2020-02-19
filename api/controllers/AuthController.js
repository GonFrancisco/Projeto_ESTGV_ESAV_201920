/**
 * Auth
 *
 * @description :: Server-side logic for managing Authentication
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const passport = require('passport');
var fs = require('fs');
 module.exports = {

    // OPEN VIEWS
    login_view: function(req, res) {
        if(!req.isAuthenticated())
            res.view('pages/auth/login', {
                title: 'Login'
            });
    },

    register_view: function(req, res) {
        if(!req.isAuthenticated())
            res.view('pages/auth/registar', {
                title: 'Registar'
            });
    },

    // LOGIN
    login: function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
          if (err) { return next(err); }
          if (!user) { return res.redirect('/login'); }
          req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
          });
        })(req, res, next);
    },

    // LOGOUT
    logout: function(req, res){
        req.logout();
        res.redirect('/');
    },
    // REGISTER
    register: async function(req, res){

        var pw = req.param("pw");
        var mail = req.param('mail');
        try {
            Utilizador.validate('pnome', req.param('pnome'));
            Utilizador.validate('unome', req.param('unome'));
          } catch (err) {
            return res.badRequest('O nome é um campo obrigatório.');
          }
        try {
            Utilizador.validate('mail', mail);
          } catch (err) {
            return res.badRequest('O email inserido é inválido.');
          }
        let tmp = await Utilizador.find({mail: mail});
        if(tmp.length > 0) return res.badRequest('O endereço "' + mail + '" já se encontra registado');
        if(pw.length < 6 ) return res.badRequest('A password deve ter no minimo 6 caracteres!');

        data = {
            //id: req.param('id'),
            pnome: req.param('pnome'),
            unome: req.param('unome'),
            mail: req.param('mail'),
            hashpw: req.param('pw'),
            tipo_conta: 'user'
        };

        await Utilizador.create(data).fetch().exec(function(err, user){
            
            if (err) { return res.serverError(err); }
            // TODO confirmation email
            req.login(user, function(err){
                if (err) { return res.serverError(err); }
                //console.log('User ' + user.id + ' has logged in.');
                fs.mkdir('assets/images/galeria/utilizadores/' + data.mail, 0744, function(err) {
                    //if (err) {
                        //if (err.code == 'EEXIST') // console.log(folder_name + ' ja existe'); // ignore the error if the folder already exists
                        //else console.log(folder_name + ' erro inesperado'); // something else went wrong
                    //} else console.log(folder_name + ' criada com sucesso'); // successfully created folder
                });
                return res.ok();
            });
        });
    }
 };