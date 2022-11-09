const router = require('express').Router();
const noteRoute = require('../apiRoutes/noteRoute');

router.use(noteRoute);

module.exports = router;