const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');

router.use(require('./zookeeperRoutes'));

module.exports = router;