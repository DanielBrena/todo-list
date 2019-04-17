/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    auth: async function (req,res){
        if(req.body.user && (req.body.user.email && req.body.user.password)){
          var email = req.body.user.email;
          var password = req.body.user.password;
          var user = await sails.helpers.apiFindOne.with({
            model:Users,
            criteria:{
              email:email,
              status:true
            }
          });
          if(user){
            var valid = await Users.comparePassword(password,user);
            
               if( valid){
                var auth = {
                    id:user.id,
                }
                var token = Users.createToken(auth);
                res.cookie('auth',JSON.stringify({auth:auth,token:token}));
                return res.json(auth);
              }else{
                return res.status(401).json({
                  errores: [{
                    mensaje: 'Error de Acceso',
                    descripcion: 'Usuario o contraseña incorrecta.'
                  }]
                });
              }
          
          }else{
            return res.status(401).json({
              errores: [{
                mensaje: 'Error de Acceso',
                descripcion: 'No existe el usuario.'
              }]
            });
          }
        }else{
          return res.status(401).json({
            errores: [{
              mensaje: 'Error de Petición',
              descripcion: 'Petición sin datos.'
            }]
          });
        }
      },
    create: async function (req, res) {
        var encrypted_password = req.body.user.password;
        req.body.user.encrypted_password = encrypted_password;
        if (req.body && req.body.user) {
            var userFind = await sails.helpers.apiFindOne.with({
                model:Users,
                criteria:{
                    email:req.body.user.email
                }
            });
            if(userFind){
                return res.status(401).json({
                    errores: [{
                        mensaje: 'Error de Petición',
                        descripcion: 'Usuario existente.'
                    }]
                });
            }else{
                var user = await sails.helpers.apiCreate.with({
                    model: Users,
                    data: req.body.user
                });
                if (user) {
                    var auth = {
                        id:user.id,
                    }
                    var token = Users.createToken(auth);
                    res.cookie('auth',JSON.stringify({auth:auth,token:token}));
                    return res.json(auth);
                } else {
                    return res.status(404).json({
                        errores: [{
                            mensaje: 'Error de Creación',
                            descripcion: 'User no creado.'
                        }]
                    });
                }
            }

           
        } else {
            return res.status(401).json({
                errores: [{
                    mensaje: 'Error de Petición',
                    descripcion: 'Petición sin datos.'
                }]
            });
        }

    },
    update: async function (req, res) {
        if (req.body && req.body.user && req.param('id')) {
            var id = req.param('id');
            var params = {};
            params.model = Users;
            params.criteria = {
                id: req.body.user.id ? req.body.user.id : parseInt(id),
                status: true
            };
            params.data = req.body.user;
            if (req.body.user.new_password) {
                params.data.encrypted_password = req.body.user.new_password;
            }
            var user = await sails.helpers.apiUpdate.with(params);
            if (user) {
                res.json(user);
            } else {
                return res.status(401).json({
                    errores: [{
                        mensaje: 'Error de Actualización',
                        descripcion: 'User no actualizada.'
                    }]
                });
            }
        } else {
            return res.status(401).json({
                errores: [{
                    mensaje: 'Error de Petición',
                    descripcion: 'Petición sin datos.'
                }]
            });
        }
    },
    find: async function (req, res) {
        var params = {};
        params.model = Users;
        params.page = req.query.page ? parseInt(req.query.page) : 0;
        params.limit = req.query.limit && parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 15;
        params.criteria = {
            status: true
        };
        params.attributes = req.query.scope ? (_.isArray(req.query.scope) ? req.query.scope : [req.query.scope]) : null;
        params.orderBy = 'createdAt desc';
        var users = await sails.helpers.apiFind.with(params);
        res.json(users);

    },
    findOne: async function (req, res) {
        if (req.param('id')) {
            var id = parseInt(req.param('id'));
            var params = {};
            params.model = Users;
            params.criteria = {
                id: id,
                status: true
            };
            var user = await sails.helpers.apiFindOne.with(params);
            res.json(user);
        } else {
            return res.status(401).json({
                errores: [{
                    mensaje: 'Error de Petición',
                    descripcion: 'Petición sin datos.'
                }]
            });
        }
    },
    destroy: async function (req, res) {
        if (req.query && req.query.id && req.param('id')) {
            var store = req.param('id');
            var params = {};
            params.model = Users;
            params.criteria = {
                id: _.isArray(req.query.id) ? req.query.id : [req.query.id],
                status: true
            }
            var users = await sails.helpers.apiDestroy.with(params);
            return res.json(users);
        } else {
            return res.status(401).json({
                errores: [{
                    mensaje: 'Error de Petición',
                    descripcion: 'Petición sin datos.'
                }]
            });
        }
    },
};

