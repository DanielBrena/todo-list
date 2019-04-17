module.exports = {


  friendlyName: 'Api update',


  description: '',


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
    data:{
      type:'ref',
      required:true,
      description:'Data to insert.'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    if(inputs.criteria && inputs.data){
      var data = await inputs.model.update(inputs.criteria,inputs.data).fetch();
      return exits.success(data);
    }else{
      return exits.success(null);
    }

  }


};

