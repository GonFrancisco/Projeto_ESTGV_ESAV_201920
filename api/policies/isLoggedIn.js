// policies/isLoggedIn.js
module.exports = async function (req, res, proceed) {

    if(req.isAuthenticated()){
      return proceed();
    }

    return res.forbidden();
  
  };