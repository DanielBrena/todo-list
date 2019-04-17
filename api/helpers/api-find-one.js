module.exports = {


  friendlyName: 'Api find one',


  description: 'Find One Data',


  inputs: {
    model:{
      type:'ref',
      required:true,
      description:'Name of Model.'
    },
    criteria:{
      type:'ref',
      description:'Criteria of model'
    },
    attributes:{
      type:'ref',
      description:'Attributes names'
    },
    subcriteria:{
      type:'ref',
      description:'Array of model'
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var criteriaAux = {}
    if(inputs.criteria){
      criteriaAux.where = inputs.criteria
      if(inputs.attributes && _.isArray(inputs.attributes)){
        criteriaAux.select = inputs.attributes;
      }
      var modelAux =  inputs.model.findOne(criteriaAux);
      if(inputs.subcriteria&& _.isArray(inputs.subcriteria)){
        _.forEach(inputs.subcriteria,function(c){
          if(c.criteria){
            modelAux.populate(c.name,c.criteria);
          }else{
            modelAux.populate(c.name);
          }
        });
      }
      return exits.success(await modelAux);

    }else{
      return exits.success(null);
    }
    

  }


};

