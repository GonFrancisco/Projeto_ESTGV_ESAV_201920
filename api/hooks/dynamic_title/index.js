module.exports = function dynamicPageTitleHook(sails) {

    return {
      routes: {
        /**
         * Runs before every matching route.
         *
         * @param {Ref} req
         * @param {Ref} res
         * @param {Function} next
         */
        before: {
          '/*': {
            skipAssets: true,
            fn: async function(req, res, next){
              // add page title variable to each response
              if (req.method === 'GET') {
                if (res.locals.title === undefined) {
                  res.locals.title = 'Registos Botânicos';
                }
              }
              return next();
            }
          }
        }
      }
    };
  
  };