/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = {
  schema:true,
  //migrate:'safe',
  attributes: {
    name:{
      type:'string',
      required:true
    },
    lastname:{
      type:'string',
      required:true
    },
    email: {
      type: 'string',
      required:true
    },
    encrypted_password: {
      type: 'string',
      columnType: 'longtext',
    },
    tasks:{
      collection:'tasks',
      via:'id_user'
    },
    token:{
      type:'string',
      columnType:'longtext'
    }
  },
  beforeCreate: function (values, callback) {
    bcrypt.genSalt(10, function (error, salt) {
      if (error) {
        callback(error);
      }
      bcrypt.hash(values.encrypted_password, salt, function (error, hash) {
        if (error) {
          callback(error);
        }
        values.encrypted_password = hash;
        callback();
      });
    });
  },
  beforeUpdate: function (values, callback) {
    if (values.encrypted_password) {
      bcrypt.genSalt(10, function (error, salt) {
        if (error) {
          callback(error);
        }
        bcrypt.hash(values.encrypted_password, salt, function (error, hash) {
          if (error) {
            callback(error);
          }
          values.encrypted_password = hash;
          callback();
        });
      });
    } else {
      callback();
    }
  },
  comparePassword: async function (password, user) {
    return await bcrypt.compare(password,user.encrypted_password);
  },
  createToken: function (data) {
    return jwt.sign(data, sails.config.configuration.token.user.secret);
  },
  validToken: function (token, callback) {
    return jwt.verify(token, sails.config.configuration.token.user.secret, {}, callback)
  }

};

