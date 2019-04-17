module.exports = {


  friendlyName: 'Api query',


  description: 'Find By Query',


  inputs: {
    model:{
      type:'ref',
      required:true,
      description:'Name of Model.'
    },
    query:{
      type:'string',
      description:'Query for consult'
    },
    values:{
      type:'ref',
      description:'Array for Values to Escape'
    }
  },


  exits: {
    success: {
      outputFriendlyName: 'Query Success',
      outputDescription: 'The query was executed.',
    },
    notQueryFound: {
      description: 'Could not query.'
    },
  },


  fn: async function (inputs, exits) {
    var modelAux = await sails.sendNativeQuery(inputs.query,[])
    if(modelAux){
      return exits.success(modelAux);
    }else{
      return exits.notQueryFound();
    }
   

  }


};

