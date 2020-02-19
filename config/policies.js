/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  //'*': 'authenticated',
  //'auth': {
    //'*': true
  //}
  UtilizadorController: {
    // By default, require requests to come from a logged-in user
    // (runs the policy in api/policies/isLoggedIn.js)
    '*': 'isLoggedIn',

  },

  AuthController: {
    // By default, require requests to come from a logged-in user
    // (runs the policy in api/policies/isLoggedIn.js)
    'logout': 'isLoggedIn',
    'login': 'isVisitor',
    'register': 'isVisitor',
    'login_view': 'isVisitor',
    'register_view': 'isVisitor'
  },

  DashboardController: {
    '*': 'isLoggedIn'
  }

};
