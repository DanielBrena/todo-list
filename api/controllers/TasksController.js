/**
 * TasksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create: async function (req, res) {
        if (req.body && req.body.task) {
            req.body.task.id_user = req.AUTH.id;
            var task = await sails.helpers.apiCreate.with({
                model: Tasks,
                data: req.body.task
            });
            if (task) {
                return res.json(task);
            } else {
                return res.status(404).json({
                    errores: [{
                        mensaje: 'Error de Creación',
                        descripcion: 'Tarea no creada.'
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
    update: async function (req, res) {
        if (req.body && req.body.task) {
            var params = {};
            params.model = Tasks;
            params.criteria = {
                id: req.body.task.id ? req.body.task.id : parseInt(req.param('id')),
                status: true
            };
            params.data = req.body.task;
            var task = await sails.helpers.apiUpdate.with(params);
            if (task) {
                res.json(task);
            } else {
                return res.status(401).json({
                    errores: [{
                        mensaje: 'Error de Actualización',
                        descripcion: 'Tarea no actualizada.'
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
    findByUser: async function (req, res) {
        var params = {};
        params.model = Tasks
        params.page = req.query.page ? parseInt(req.query.page) : 0;
        params.limit = req.query.limit && parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 3;
        params.criteria = {
            id_user: req.AUTH.id,
            status: true
        }
        params.orderBy = 'updatedAt desc';

        var tasks = await sails.helpers.apiFind.with(params);
        return res.json(tasks);
    },
    findOne: async function (req, res) {
        if (req.param('id')) {
          var id = parseInt(req.param('id'));
          var params = {};
          params.model = Tasks;
          params.criteria = {
            id: id,
            id_user: req.AUTH.id,
            status: true
          };
          var task = await sails.helpers.apiFindOne.with(params);
          res.json(task);
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
        if (req.param && req.param('id')) {
            var params = {};
            params.model = Tasks;
            params.criteria = {
                id: parseInt(req.param('id'))
            }
            var tasks = await sails.helpers.apiDestroy.with(params);
            return res.json(tasks);
        } else {
            return res.status(401).json({
                errores: [{
                    mensaje: 'Error de Petición',
                    descripcion: 'Petición sin datos.'
                }]
            });
        }
    },
    search: async function (req, res) {
        var query = req.query && req.query.query ? req.query.query : '';
        var params = {};
        params.model = Tasks;
        params.page = 1;
        params.limit = 3;
        params.criteria = {
            id_user: req.AUTH.id,
            or: [
                {
                    title: {
                        'contains': query
                    }
                },
                {
                    description: {
                        'contains': query
                    }
                }
            ],

            status: true
        };
        params.attributes = req.query.scope ? (_.isArray(req.query.scope) ? req.query.scope : [req.query.scope]) : null;
        var tasks = await sails.helpers.apiFind.with(params);
        res.json(tasks);
    },

};

