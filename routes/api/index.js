const router = require('express').Router();
const UserRoutes= require('./user-routes');
// const ThoughtsRoutes = require('./thought-routes');

router.use('/users',UserRoutes);




module.exports= router;