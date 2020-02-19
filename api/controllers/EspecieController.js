/**
 * Especie
 *
 * @description :: Server-side logic for managing Especie
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var NovosTermosController = require('./NovosTermosController');
var FotoController = require('./FotoController');

module.exports = {

  home: async function (req, res) {
    var obj = {}
    var arrayToReturn = []
    try {
      result = await Especie.find();
      if (result)
        for (i = 0; i < result.length; i++) {
          name = result[i].genero + ' ' + result[i].nome;
          if (result[i].sub_especie != "")
            name = name + ' ' + result[i].sub_especie;
          obj = {
            label: name,
            category: "Espécie"
          };
          arrayToReturn.push(obj);
        }
      result = await Genero.find();
      if (result)
        for (i = 0; i < result.length; i++) {
          obj = {
            label: result[i].id,
            category: "Género"
          };
          arrayToReturn.push(obj);
        }
      result = await Familia.find();
      if (result)
        for (i = 0; i < result.length; i++) {
          obj = {
            label: result[i].id,
            category: "Família"
          };
          arrayToReturn.push(obj);
        }
      result = await Ordem.find();
      if (result)
        for (i = 0; i < result.length; i++) {
          obj = {
            label: result[i].id,
            category: "Ordem"
          };
          arrayToReturn.push(obj);
        }
    } catch (err) {
      switch (err.name) {
        case 'UsageError':
          return res.badRequest(err);
        default:
          throw err;
      }
    }
    //console.log(arrayToReturn);
	//console.log('ola');
    return res.view('pages/homepage', {
      result: arrayToReturn,
      sem_resultado: req.flash('sem_resultado')
    });
  },
  
  search: async function (req, res) {
    var id = req.param('id');
    if(id.indexOf(' ') == -1){
      if(id.indexOf('_') == -1){
        try{
          result = await Especie.find({
            nome: id
          });
          if (result.length > 0) {
            return res.view('pages/especie/resultados', {
              result: result,
              title: 'Resultados para ' + result[0].nome
            });
          } else {
            result = await Genero.findOne({
              id: id
            });
            if (result) {
              especies = await Especie.find({
                genero: result.id
              })
              return res.view('pages/genero/genero', {
                result: result,
                especies: especies,
                title: result.id
              });
            } else {
              result = await Familia.findOne({
                id: id
              });
              if (result) { 
                var query = `
                select * from especie where genero in (
                  select nome from genero where familia = $1
                  )`;
                especies = await sails.sendNativeQuery(query, [ result.id ]);
                genes = await Genero.find({
                  familia: result.id,
                });
                //console.log(especies);
                return res.view('pages/familia/familia', {
                  result: result,
                  especies: especies.rows,
                  genes: genes,
                  title: result.id
                });
              } else {
                result = await Ordem.findOne({
                  id: id
                });
                if (result) {
                  var query = `
                  select especie.nome as nome, genero.nome as genero, familia, nomes_comuns from especie
                  JOIN genero on especie.genero = genero.nome
                  where especie.genero in (
                    select nome from genero where familia in (
                      select nome from familia where ordem = $1
                    ))`;
                  especies = await sails.sendNativeQuery(query, [ result.id ]);
                  query = `
                  SELECT *
                  FROM Genero JOIN Familia ON Genero.familia = Familia.nome
                  WHERE Familia.ordem = $1`;
                  genes = await sails.sendNativeQuery(query, [ result.id ]);
                  familia = await Familia.find({
                    ordem: result.id
                  });
                  //console.log(especies.rows);
                  return res.view('pages/ordem/ordem', {
                    result: result,
                    especies: especies.rows,
                    genes: genes.rows,
                    familias: familia,
                    title: result.id
                  });
                } else {
                    return NovosTermosController.addTerm(id, req, res);
                }
              }
            }
          }
        } catch (err) {
          switch (err.name) {
            case 'UsageError':
              return res.badRequest(err);
            default:
              throw err;
          }
        }
      } else {
        id = id.split('_');
      }
    }
    //console.log('Teste com espaço: ' + id);
    if(id.indexOf(' ') != -1){
      id = id.split(' ');
    }
    //console.log('Teste com espaço: ' + id);
    if(id.length >= 2){
      var sub = ""
      if(id.length == 3){   
        sub = id[2];
        if(sub[0] != "'")
            sub = "'" + sub + "'";
      } else if (id.length > 3) {
        if(id[2][0] == "'"){
            var i = 3;
            //console.log(id[3] + ' e ' + id[4]);
            while(true){
                if(id[i][id[i].length-1] == "'") break;
                i++;
            }
            sub = id[2];
            for(j = 3; j <= i; j++){
                sub += ' ';
                sub += id[j];
            }
            //console.log(sub);
        } else {
            //console.log("id" + id);
            sub = "'" + id[2];
            for(j = 3; j < id.length; j++){
                sub += ' ';
                sub += id[j];
            }
            sub = sub + "'";
            //console.log("sub" + sub);
        }
      }
      try {
        const result = await Especie.findOne({
          nome: id[1],
          genero: id[0],
          sub_especie: sub
        });
        //console.log(result);
        if (result) {
          var query = `
          select familia from genero where nome = $1`;
          familia = await sails.sendNativeQuery(query, [ result.genero ]);
          //console.log(familia);
          //console.log(familia.rows[0]);
          //console.log(familia.rows[0].familia);
          query = `
          select * from ordem where nome = (
            select ordem from familia where nome = $1
            )`;
          order = await sails.sendNativeQuery(query, [ familia.rows[0].familia ]);
          var capa = await FotoController.getCapa(result.id, req, res);
          if (capa != 'semfotos.jpg') capa = result.genero + '_' + result.nome + '_' + result.sub_especie + '/' + capa;

            //console.log(capa)
            //console.log(result)
        return res.view('pages/especie/especie', {
            capa: capa,
            result: result,
            order: order,
            familia: familia,
            title: result.genero + ' ' + result.nome
        });
        } else {
            //console.log(id);
            return NovosTermosController.addTerm(id, req, res);
          }
      } catch (err) {
        switch (err.name) {
          case 'UsageError':
            return res.badRequest(err);
          default:
            throw err;
        }
      }
    } else {
      //console.log(id);
      return NovosTermosController.addTerm(id, req, res);
    }
  },

  openTabela: async function(req, res){
    var colunas = ['ID', 'Género', 'Espécie', 'Sub-espécie', 'Nomes Comuns', 'Características', 'Imagem do Ciclo', 'Link da Wikipédia', 'Ecologia', 'Distribuição', 'Origem', 'Utilizações', 'Observações', 'Referências'];
    var data = [
        { "data": "id" },
        { "data": "genero" },
        { "data": "nome" },
        { "data": "sub_especie" },
        { "data": "nomes_comuns" },
        { "data": "caracteristicas" },
        { "data": "imagem_ciclo" },
        { "data": "wiki_link" },
        { "data": "ecologia" },
        { "data": "distribuicao" },
        { "data": "origem" },
        { "data": "utilizacoes" },
        { "data": "observacoes" },
        { "data": "referencias" }
    ]
    generos = await Genero.find({
      select: ['id']
    }).sort('id ASC');;

    return res.view('pages/dashboard/tabela_especie', {
      layout: 'layouts/dashboard',
      colunas: colunas,
      nome: 'especies',
      generos: generos,
      data: data
    });
  },

  toJSON: async function(req, res){
    result = await Especie.find({
        select: ['id', 'nome', 'sub_especie', 'genero', 'nomes_comuns', 'caracteristicas', 'imagem_ciclo', 'wiki_link', 'ecologia', 'distribuicao', 'origem', 'utilizacoes', 'observacoes', 'referencias']
      });
      if (result.length > 0) {
        //console.log(JSON.stringify(result));
        return res.send(result);
    }
  },

  addNew: async function(req, res){
    
    let nc = req.param('nomes_comuns');
    let ref = req.param('ref');

    // TODO: converter array para string
    //console.log(req.param('nome'));
    data = {
      genero: req.param('genero'),
      nome: req.param('nome'),
      sub_especie: req.param('sub'),
      nomes_comuns: nc,
      caracteristicas: req.param('caracteristicas'),
      imagem_ciclo: 'temp',//req.param('unome'),
      wiki_link: req.param('wiki'),
      ecologia: req.param('ecologia'),
      origem: req.param('origem'),
      distribuicao: req.param('dist'),
      utilizacoes: req.param('util'),
      observacoes: req.param('obs'),
      referencias: ref
    };

    Especie.create(data).fetch().exec(function(err, user){
        if (err) { return res.serverError(err); }
        return res.ok();
    });
  },

  edit: async function(req, res){
    
    let nc = req.param('nomes_comuns');
    let ref = req.param('ref');

    var updatedEspecie = await Especie.updateOne({ id:req.param('id') })
    .set({
        genero: req.param('genero'),
        nome: req.param('nome'),
        sub_especie: req.param('sub'),
        nomes_comuns: nc,
        caracteristicas: req.param('caracteristicas'),
        imagem_ciclo: 'temp',
        wiki_link: req.param('wiki'),
        ecologia: req.param('ecologia'),
        origem: req.param('origem'),
        distribuicao: req.param('dist'),
        utilizacoes: req.param('util'),
        observacoes: req.param('obs'),
        referencias: ref
    });

    if (updatedEspecie) {
        return res.ok();
      }
      else {
        return res.serverError();
      }
  },

  apagar: async function(req, res){
    var del = await Especie.destroyOne({id: req.param('id')})
        if (del) {
            return res.ok();
        } else {
            return res.serverError();
        }
  },

  top_pesquisa: async function(req, res){
      var top = await Especie.find({
        select: ['nome', 'sub_especie', 'genero', 'n_pesquisas']
      }).sort('n_pesquisas DESC').limit(5);
      if (top) {
        return res.send(top);
    } else {
        return res.serverError();
    }
  }

};
