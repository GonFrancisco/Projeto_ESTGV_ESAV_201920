/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

var helmet = require('helmet');

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/

  middleware: {

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/

     order: [
       'cookieParser',
       'session',
       'flash',
       'passportInit',            // <==== If you're using "passport", you'll want to have its two
       'passportSession',         // <==== middleware functions run after "session".
       'bodyParser',
       'compress',
       'poweredBy',
	   'helmetProtection',
       'router',
       'www',
       'favicon',
     ],


    /***************************************************************************
    *                                                                          *
    * The body parser that will handle incoming multipart HTTP requests.       *
    *                                                                          *
    * https://sailsjs.com/config/http#?customizing-the-body-parser             *
    *                                                                          *
    ***************************************************************************/

    bodyParser: require('skipper')({
      maxWaitTimeBeforePassingControlToApp: 1000
    }),
	/***************************************************************************
    *                                                                          *
    * Initialise for both passport and passport-local                          *
    *                                                                          *
    * https://sailsjs.com/config/http#?customizing-the-body-parser             *
    *                                                                          *
    ***************************************************************************/
    
    passportInit    : (function (){
      return require('passport').initialize();
    })(),

    passportSession : (function (){
      return require('passport').session();
    })(),

    flash           : (function (){
      return require('connect-flash')();
    })(),
	
	helmetProtection: function helmetProtection(req, res, next) {
      return helmet({
        frameguard: false,
		noCache: true
      })(req, res, next);
    }
  },

};
