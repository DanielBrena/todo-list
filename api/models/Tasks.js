/**
 * Tasks.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema:true,
  //migrate:'safe',
  attributes: {
    title:{
      type:'string',
      required:true
    },
    description:{
      type:'string',
      columnType: 'longtext'
    },
    is_check:{
      type:'boolean',
      defaultsTo:false
    },
    id_user:{
      model:'users'
    }
    

  },

};

