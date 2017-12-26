const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Gateway = require('../models/gateway');
//only for development-------------------------------------------------
router.get('/all', (req, res, next) => {
  Gateway.getAllGateways((err, gateways) => {
    if (err) {
      res.json({ success: false, msg: 'Failed !' });
    } else {
      res.json({ success: true, msg: 'Downloaded', gateways: gateways });
    }
  });
});
//--------------------------------------------------------------------

router.post('/add', (req, res) => {
  console.log(req.body)
  let gateway = {
    metadata: {
      d_name: req.body.metadata.d_name,
      d_type: req.body.metadata.d_type,
      uAPI: req.body.metadata.uAPI
    },
    endNodes: req.body.endNodes
  }
  Gateway.addGateway(gateway,(err,gateway)=>{
    if (err) {
      console.error(err);
      res.json({ success: false, msg: 'Failed !' });
    } else {
      res.json({ success: true, msg: 'added'});
    }
  })
});

module.exports = router;
