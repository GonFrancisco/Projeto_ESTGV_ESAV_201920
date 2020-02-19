/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` your home page.            *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/
    
    'post /pesquisa': 'EspecieController.search',
    'get /top': 'EspecieController.top_pesquisa',

    '/especie/:id': 'EspecieController.search',
    '/genero/:id': 'EspecieController.search',
    '/familia/:id': 'EspecieController.search',
    '/ordem/:id': 'EspecieController.search',

    // sugestões
    'post /sugerir': 'SugestoesController.add',

    // comentarios
    'post /addComentario': 'ComentarioController.add',
    'post /getComentarios/:id_especie': 'ComentarioController.getByEspecie',

    // exportar pdf
    '/getPDF:url?': 'PdfController.getPDF',

    '/': 'EspecieController.home',

    '/dashboard': 'DashboardController.index',
    '/dashboard/tabelas/utilizadores' : 'UtilizadorController.openTabela',
    '/dashboard/tabelas/utilizadores/data' : 'UtilizadorController.toJSON',
    '/dashboard/tabelas/ordens' : 'OrdemController.openTabela',
    '/dashboard/tabelas/ordens/data' : 'OrdemController.toJSON',
    '/dashboard/tabelas/familias' : 'FamiliaController.openTabela',
    '/dashboard/tabelas/familias/data' : 'FamiliaController.toJSON',
    '/dashboard/tabelas/generos' : 'GeneroController.openTabela',
    '/dashboard/tabelas/generos/data' : 'GeneroController.toJSON',
    '/dashboard/tabelas/especies' : 'EspecieController.openTabela',
    '/dashboard/tabelas/especies/data' : 'EspecieController.toJSON',
    '/dashboard/tabelas/novostermos' : 'NovosTermosController.openTabela',
    '/dashboard/tabelas/novostermos/data' : 'NovosTermosController.toJSON',
    '/dashboard/tabelas/sugestoes' : 'SugestoesController.openTabela',
    '/dashboard/tabelas/sugestoes/data' : 'SugestoesController.toJSON',

    'post /criarEspecie': 'EspecieController.addNew',
    'post /editarEspecie': 'EspecieController.edit',
    'post /apagarEspecie': 'EspecieController.apagar',

    'post /criarGenero': 'GeneroController.addNew',
    'post /editarGenero': 'GeneroController.edit',
    'post /apagarGenero': 'GeneroController.apagar',

    'post /criarFamilia': 'FamiliaController.addNew',
    'post /editarFamilia': 'FamiliaController.edit',
    'post /apagarFamilia': 'FamiliaController.apagar',

    'post /criarOrdem': 'OrdemController.addNew',
    'post /editarOrdem': 'OrdemController.edit',
    'post /apagarOrdem': 'OrdemController.apagar',

    'post /criarUser': 'UtilizadorController.addNew',
    'post /editarUser': 'UtilizadorController.edit',
    'post /apagarUser': 'UtilizadorController.apagar',

    // auth
    'get /login': 'AuthController.login_view',
    'get /registar': 'AuthController.register_view',
    'post /login': 'AuthController.login',
    'post /registar': 'AuthController.register',
    '/logout': 'AuthController.logout',
    'post /uploadAvatar': 'UtilizadorController.uploadAvatar',

    // edit user data
    'post /editar': 'UtilizadorController.edit',
    'post /alterar_pw': 'UtilizadorController.update_pw',
      /***************************************************************************
       *                                                                          *
       * More custom routes here...                                               *
       * (See https://sailsjs.com/config/routes for examples.)                    *
       *                                                                          *
       * If a request to a URL doesn't match any of the routes in this file, it   *
       * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
       * not match any of those, it is matched against static assets.             *
       *                                                                          *
       ***************************************************************************/

    };
