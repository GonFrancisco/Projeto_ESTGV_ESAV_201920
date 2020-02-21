/**
 * Dashboard
 *
 * @description :: Server-side logic for managing the administration dashboard
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

    index: async function(req, res){
        if(req.user.isadmin){
            numero_comentarios = await Comentario.find({select: ['id']});
            numero_reportados = await ComentarioReportado.find({select: ['id']});
            numero_imagens = await Foto.find({select: ['id']});
            numero_negativas = await Foto.find({avaliacao: { '<=': -1 }});
            numero_utilizadores = await Utilizador.find({select: ['id']});
            numero_administradores = await Utilizador.find({where: {isadmin:1},select: ['id']});
            numero_especies = await Especie.find({select: ['id']});
            numero_generos = await Genero.find({select: ['id']});
            numero_familias = await Familia.find({select: ['id']});
            numero_ordens = await Ordem.find({select: ['id']});
            return res.view('pages/dashboard/index',{
            layout: 'layouts/dashboard',
            nc: numero_comentarios.length,
            nr: numero_reportados.length,
            ni: numero_imagens.length,
            nn: numero_negativas.length,
            nu: numero_utilizadores.length,
            na: numero_administradores.length,
            ne: numero_especies.length,
            ng: numero_generos.length,
            nf: numero_familias.length,
            no: numero_ordens.length
            });
        } else
            res.redirect('/');
    },

    openTabelaUtilizadores: async function(req, res){
        var colunas = ['ID', 'Primeiro Nome', 'Apelidos', 'E-mail', 'Tipo de conta', 'Ações'];
        result = await User.find({
            select: ['pnome', 'apelidos', 'mail', 'tipo_conta']
          });
          if (result.length > 0) {
              //console.log(result);
            return res.view('pages/dashboard/tabela', {
              result: result,
              colunas: colunas,
              nome: 'utilizadores',
              title: 'Utilizadores'
            });
        }
    },

    teste: async function(req, res){
        
            return res.view('pages/dashboard/teste', {

            });

    },
    
 };