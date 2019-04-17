module.exports = {


  friendlyName: 'Api destroy',


  description: 'Destroy Data',


  inputs: {
    model:{
      type:'ref',
      required:true,
      description:'Name of Model.'
    },
    criteria:{
      type:'ref',
      description:'Criteria of model'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    if(inputs.criteria){
      var data = await inputs.model.update(inputs.criteria,{status:false}).fetch();
      return exits.success(data);
    }else{
      return exits.success(null);
    }
    
    // All done.
    

  }


};

