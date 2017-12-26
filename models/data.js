const mongoose = require('mongoose');
const config = require('../config/database');

const DataSchema = mongoose.Schema({
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
  data: {
    type: Array,
    default: []
  }

});

const Data = module.exports = mongoose.model('Data', DataSchema);
//only for dev --------------------------------
module.exports.getAllDatas = function (callback) {
  Data.find(callback);
}
//----------------------------------------------
module.exports.getDataById = function (id, callback) {
  Data.findById(id, callback);
}

module.exports.getDatasByUAPI = function (uAPI, callback) {
  const query = {
    metadata: {
      uAPI: uAPI
    }
  }
  Data.findOne(query, callback);
}

module.exports.getDatasByDAPI = function (dAPI, callback) {
  const query = {
    metadata: {
      dAPI: dAPI
    }
  }
  Data.findOne(query, callback);
}

module.exports.getDatasByENAPI = function (enAPI, callback) {
  const query = {
    metadata: {
      enAPI: enAPI
    }
  }
  Data.findOne(query, callback);
}

module.exports.addData = function (newData, callback) {
  //newData.save(callback);
  Data.create(newData, callback);
}