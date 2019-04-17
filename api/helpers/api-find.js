module.exports = {


  friendlyName: 'Api find',


  description: 'Find Data',


  inputs: {
    model: {
      type: 'ref',
      required: true,
      description: 'Name of Model.'
    },
    criteria: {
      type: 'ref',
      description: 'Criteria of model'
    },
    attributes: {
      type: 'ref',
      description: 'Attributes names'
    },
    subcriteria: {
      type: 'ref',
      description: 'Array of model'
    },
    page: {
      type: 'number',
      description: 'Page of pagination'
    },
    limit: {
      type: 'number',
      description: 'Limit of pagination'
    },
    orderBy: {
      type: 'string',
      description: 'Order by'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    // var criteriaAux = {};
    var criteriaAux = {
      limit: inputs.limit ? inputs.limit : 15,
      skip: inputs.page ? inputs.page : 0
    };
    var pageTemp = inputs.page;
    if (criteriaAux.skip > 0) {
      criteriaAux.skip = criteriaAux.limit * (criteriaAux.skip - 1)
    } else {
      pageTemp = 1;
    }

    if (inputs.criteria) {
      criteriaAux.where = inputs.criteria;
    }
    if (inputs.attributes && _.isArray(inputs.attributes)) {
      criteriaAux.select = inputs.attributes;
    }
    var modelAux = inputs.model.find(criteriaAux);
    // inputs.orderBy ?  inputs.model.find(criteriaAux).sort(inputs.orderBy) :  inputs.model.find(criteriaAux)
    if (inputs.subcriteria && _.isArray(inputs.subcriteria)) {
      _.forEach(inputs.subcriteria, function (c) {
        if (c.criteria) {
          modelAux.populate(c.name, c.criteria);
        } else {
          modelAux.populate(c.name);
        }
      });
    }
    if (inputs.orderBy) {
      modelAux.sort(inputs.orderBy)
    }

    var count = await inputs.model.count(_.omit(criteriaAux, ['skip', 'limit', 'select', 'sort']));
    countAux1 = parseInt(count / criteriaAux.limit);
    countAux2 = parseInt(count % criteriaAux.limit);
    if (countAux2 > 0) {
      countAux1 += 1;
    }
    return exits.success({
      paginate: parseInt(countAux1),
      page: parseInt(pageTemp),
      data: await modelAux
    });
    //return exits.success(await modelAux);
  }


};
