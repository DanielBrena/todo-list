module.exports = {


  friendlyName: 'Api create',


  description: 'Create Data',


  inputs: {
    model:{
      type:'ref',
      required:true,
      description:'Name of Model.'
    },
    data:{
      type:'ref',
      required:true,
      description:'Data to insert.'
    }
  },


  // exits: {

  // },


  fn: async function (inputs, exits) {
    if(_.isArray(inputs.data)){
      var data = await inputs.model.createEach(inputs.data).fetch();
      return exits.success(data);
    }else{
      var data = await inputs.model.create(inputs.data).fetch();
      return exits.success(data);
    }

  }


};

