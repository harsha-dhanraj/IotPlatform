const mongoose = require('mongoose');
const config = require('../config/database');

const GatewaySchema = mongoose.Schema({
  metadata: {
    d_name: {
      type: String,
      required: true
    },
    d_type: {
      type: String,
      required: true
    },
    uAPI: {
      type: String,
      required: true
    }
  },
  endNodes: {
    type: Array,
    default: []
  }

});

const Gateway = module.exports = mongoose.model('Gateway', GatewaySchema);
//only for dev --------------------------------
module.exports.getAllGateways = function (callback) {
  Gateway.find(callback);
}
//----------------------------------------------
module.exports.getGatewayById = function (id, callback) {
  Gateway.findById(id, callback);
}

module.exports.getGatewaysByUAPI = function (uAPI, callback) {
  const query = {
    metadata: {
      uAPI: uAPI
    }
  }
  Gateway.find(query, callback);
}

module.exports.addGateway = function (newGateway, callback) {
  //newGateway.save(callback);
  Gateway.create(newGateway, callback);
}