// TODO: make a new router for the tigers resource
// and make some REST routes for it, exactly like for lions
// make a middleware that just logs the word 'tiger' to the console
// when a request comes in to the server

var tigerRouter = require('express').Router();

var id = 0;
var tigers = [];

var updateId = function (req, res, next) {
    id++;
    req.body.id = id + '';
    next();
}

var logTiger = function () {
    return function (req, res, next) {
        console.log("tiger request has come");
        next();
    }
}

tigerRouter.use(logTiger());


tigerRouter.param('id', function (req, res, next, id) {
    var tiger = _.find(tigers, { id: id });
    if (tiger) {
        req.tiger = tiger;
        next();
    }
    else {
        res.send(new Error("No tiger found"));
    }
})

tigerRouter.get('/', function (req, res) {
    res.json(tigers);
})

tigerRouter.get('/:id', function (req, res) {
    res.json(req.tiger);
})

tigerRouter.post('/', updateId, function (req, res) {
    var tiger = req.body;
    tigers.push(tiger);
    res.json(tiger);
})

tigerRouter.put('/:id', function (req, res) {
    var update = req.body;
    if (update.id) {
        delete update.id;
    }
    var tiger = _.findIndex(tigers, { id: req.params.id })
    if (tigers[tiger]) {
        var updatedTiger = _.assign(tigers[tiger], update);
        res.json(updatedTiger);
    }
})
