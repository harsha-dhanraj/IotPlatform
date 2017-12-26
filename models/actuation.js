const mongoose = require('mongoose');
const config = require('../config/database');

const ActuationSchema = mongoose.Schema({
  metadata: {
    uAPI: {
      type: String,
      required: true
    },
    dAPI:{
      type:String,
      required:true
    },
    enAPI:{
      type:String,
      required:true
    }
  },
  actuation: {
    type: Array,
    default: []
  }

});

const Actuation = module.exports = mongoose.model('Actuation', ActuationSchema);
//only for dev --------------------------------
module.exports.getAllActuations = function (callback) {
  Actuation.find(callback);
}
//----------------------------------------------
module.exports.getActuationById = function (id, callback) {
  Actuation.findById(id, callback);
}

module.exports.getActuationsByUAPI = function (uAPI, callback) {
  const query = {
    metadata: {
      uAPI: uAPI
    }
  }
  Data.findOne(query, callback);
}

module.exports.getActuationsByDAPI = function (dAPI, callback) {
  const query = {
    metadata: {
      dAPI: dAPI
    }
  }
  Data.findOne(query, callback);
}

module.exports.getActuationsByENAPI = function (enAPI, callback) {
  const query = {
    metadata: {
      enAPI: enAPI
    }
  }
  Data.findOne(query, callback);
}

module.exports.addActuation = function (newData, callback) {
  //newData.save(callback);
  Data.create(newData, callback);
}