// policies/isVisitor.js
module.exports = async function (req, res, proceed) {

    if(req.isAuthenticated()){
      return res.forbidden();
    }

    return proceed();
  
  };