var router = require('express').Router();
var userRouter = require('./user/userRoutes');
var postRouter = require('./post/postRoutes');
var categoryRouter = require('./category/categoryRoutes');

// api router will mount other routers
// for all our resources. Each resource directory
// has a resourceRoutes.js file with the router ready to go,
// require them and mount them to their respective routes below

router.use('/users', userRouter);
router.use('/categories', postRouter);
router.use('/posts', categoryRouter);

module.exports = router;
