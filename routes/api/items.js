var express = require('express');
var router = express.Router();

// on routes that end in /bears
// ----------------------------------------------------
router.route('/')
    // create an item (accessed at POST http://localhost:8080/api/items)
    .post(function(req, res) {
        res.json('post /items')
    })

    // get all the items (accessed at GET http://localhost:8080/api/items)
    .get(function(req, res) {
        res.json('get /items')
    });
// on routes that end in /items/:item_id
// ----------------------------------------------------
router.route('/:item_id')
    // get the item with that id (accessed at GET /api/item/:item_id)
    .get(function(req, res) {
        res.json('get /item ' + req.params['item_id'])
    })
    // update the item with that id (accessed at PUT /api/item/:item_id)
    .put(function(req, res) {
        res.json('put /item ' + req.params['item_id'])
    })
    // delete the item with that id (accessed at DELETE /api/item/:item_id)
    .delete(function(req, res) {
        res.json('delete /item ' + req.params['item_id'])
    });

module.exports = router;