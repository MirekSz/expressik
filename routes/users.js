var express = require('express');
var router = express.Router();
var lib = require('./lib');

router.get('/:id/:state', lib.handle((req, res, model) => {
    model.title = 'User id = ' + JSON.stringify(req.params);
    res.render('index', model);
}));

module.exports = router;
