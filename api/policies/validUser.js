module.exports = async function(req,res,next){
    if(req.cookies && req.cookies.auth){
      var cookie = JSON.parse(req.cookies.auth);
  
      var token = cookie.token;
      Users.validToken(token,function(error,valid){
        if(error){
          return res.status(401).json({
            errores: [{
              mensaje: 'Token inválido',
              descripcion: 'El token es inválido o ya caducó.'
            }]
          });
        }else{
          req.AUTH = valid;
          return next();
        }
      });
    }else{
      return res.status(401).json({
        errores: [{
          mensaje: 'Error de Autenticación',
          descripcion: 'No se encuentra iniciado sesión.'
        }]
      });
    }
  }