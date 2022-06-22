const router = require('express').Router();
const UserRoutes= require('./user-routes');
const ThoughtsRoutes = require('./thought-routes');

router.use('/users',UserRoutes);
router.use('/thoughts',ThoughtsRoutes);



module.exports= router;