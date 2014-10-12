var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;

    db.collection('userlist').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    db.collection('userlist').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('userlist').removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

/*
* FIND the user
*/
router.get('/find/:query', function(req,res){
  var db = req.db;
  var matcher = new RegExp(req.params.query,'i');
  db.collection('userlist').find({ 'fullname': matcher}).toArray(function(err,items){
    res.json(items);
  });
});

/*
 * POST to data miner.
 */
router.post('/dataminer', function(req, res) {
    var db = req.db;
    db.collection('datalist').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


/*
 * GET dataminer.
 */
router.get('/dataminer', function(req, res) {
    var db = req.db;

    db.collection('datalist').find().toArray(function (err, items) {
        res.json(items);
    });
});



module.exports = router;
