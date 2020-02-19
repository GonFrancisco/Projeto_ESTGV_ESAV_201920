// policies/isLoggedIn.js
module.exports = async function (req, res, proceed) {

    console.log(req.user.tipo_conta);
    if(req.user.tipo_conta === 'admin'){
      return proceed();
    }

    return res.forbidden();
  
  };